<?php
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//$input = utf8_encode(file_get_contents('php://input'),true);

error_log("Method:".$method);//." Request:".$request." Input:".$input,0);
//error_log("file_get_contents:".file_get_contents('php://input'));
//error_log("Participant name:".$participant['Name']." Contestants length:".sizeOf($contestants));


// connect to the mysql database
//$link = mysqli_connect('localhost', 'root', 'raspberry', 'kittens');
$mysqli = new mysqli('localhost', 'root', 'raspberry', 'kittens');
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if ($method == "GET")
{
	if ($request[0] == "leaders")
	{
		$sql = "SELECT Name, Votes, ImageUrl FROM leaders order by Votes desc";
	}
	if ($request[0] == "visitors")
	{
		$sql = "SELECT Name, City, Country, TimeStamp FROM visitor order by TimeStamp desc Limit 300";
	}
	if	($request[0] == "comments") {
		$sql = "SELECT v.Name, v.City, v.Country, c.Comment, c.TimeStamp from Visitor v inner join Comment c on c.VisitorId = v.Id order by c.TimeStamp desc;";
	}
	$result = $mysqli->query($sql);
	echo '[';
	for ($i=0;$i<$result->num_rows;$i++) {
		echo ($i>0?',':'').json_encode($result->fetch_object());
	}
	echo ']';
  }

else if ($method == "POST")
{
	$input = json_decode(utf8_encode(file_get_contents('php://input')),true);
	if ($request[0] == "results"){		
		$participant = $input["Participant"];
		$visitorId = $participant['VisitorId'];
		error_log('VisitorId = '.$visitorId);		
		if ($visitorId == ''){
			//new visitor
			if (sizeOf($participant['Name']) > 0) {
				$sql = 'CALL spInsertVisitor("'.$participant['Name'].'","'.$participant['City'].'","'.$participant['Country'].'",@Id);';
				error_log($sql);
				if (!$mysqli->query("SET @Id = -1;") || !$mysqli->query($sql)) {
					echo "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
				}
				if (!($res = $mysqli->query("SELECT @Id as visitorId"))) {
					echo "Fetch failed: (" . $mysqli->errno . ") " . $mysqli->error;
				}	
				$row = $res->fetch_assoc();
				$visitorId = $row['visitorId'];	
				error_log("VisitorId: ".$visitorId);
			}
		}
		$contestants = $input["Contestants"];

		for ($n=0;$n<sizeOf($contestants);$n++) {
			$cont = $contestants[$n];
			if ($cont['Votes'] > 0) {
				error_log('Contestant: '.$cont['Name'].' Votes: '.$cont['Votes']);
				$sql = 'INSERT into Vote (Name, Votes, VisitorId) values ("'.$cont['Name'].'",'.$cont['Votes'].','.$visitorId.');';
				if (!$mysqli->query("SET @Id = -1;") || !$mysqli->query($sql)) {
					echo "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
				}
			}
		}
		echo '{"VisitorId":'.$visitorId.'}';
	}	
	if ($request[0] == "comment"){
		$participant = $input["Participant"];	
		$visitorId = -1;
		if (array_key_exists('VisitorId',$participant)) {
			$visitorId = $participant['VisitorId'];
			error_log('Found visitor id: '+$visitorId);
		}
		error_log($participant["Comments"]);
		if (sizeOf($participant["Comments"] > 0)) {			
			$sql = 'CALL spInsertComment("'.$participant['Comments'].'",'.$visitorId.',@Id);';
			error_log($sql);
			if (!$mysqli->query("SET @Id = -1;") || !$mysqli->query($sql)) {
				error_log("CALL failed: (" . $mysqli->errno . ") " . $mysqli->error);
			}
		}
	}
}
http_response_code(200);
 
// close mysql connection
$mysqli->close();
?>