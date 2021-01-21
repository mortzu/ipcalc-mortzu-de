<?php

$words = array(
  'NETWORK' => 'Network address',
  'NETMASK' => 'Netmask',
  'PREFIX' => 'Prefix',
  'BROADCAST' => 'Broadcast',
  'ADDRSPACE' => 'Type',
  'MINADDR' => 'Lowest address',
  'MAXADDR' => 'Highest address',
  'ADDRESSES' => 'Number of addresses'
);

$data = '';

if (isset($_REQUEST['ipinput']) && !empty($_REQUEST['ipinput'])) {
  $json = shell_exec(getenv('HOME') . '/.local/bin/ipcalc --json ' . escapeshellarg($_REQUEST['ipinput']));

  if (null === $json_decoded = json_decode($json, true))
    $data = 'Invalid input!';
  else {
    $data = <<<EOF
<hr>
<table class="table table-bordered">
EOF;

    foreach ($words as $key => $value)
      if (isset($json_decoded[$key]) && !empty($json_decoded[$key]))
        $data .= <<<EOF
<tr>
<td>${value}</td><td>${json_decoded[$key]}</td>
</tr>
EOF;

    $data .= '</table>';
  }
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IPcalc</title>
    <link rel="stylesheet" href="/bootstrap.min.css">
    <link rel="stylesheet" href="/font-awesome.min.css">
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="container">
      <hgroup>
        <h1>IP calculator</h1>
        <h2>Calculate IP addresses in your browser</h2>
      </hgroup>

      <form class="form-signin" method="post" action="/">
        <div class="input-group" style="width: 100%;">
          <input class="form-control" type="text" name="ipinput" style="width: 80%; margin-right: 1%;" value="<?php echo ((isset($_REQUEST['ipinput']) && !empty($_REQUEST['ipinput'])) ? $_REQUEST['ipinput'] : ''); ?>"></input>
          <input class="btn btn-lg btn-primary btn-sm" type="submit" name="submit" value="Calc!" style="width: 19%;"></input>
        </div>
      </form>
<?php echo $data; ?>
    </div>

<footer class="footer">
  <div class="container" style="padding: 10px 0; text-align: center;">
    <img src="/img/madeinbremen.png" height="80">
    <p class="text-muted">made with ♥ in Bremen</p>
  </div>
</footer>

  </body>
</html>
