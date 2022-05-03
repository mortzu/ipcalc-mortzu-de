function calc_ip () {
    var ipinput = document.getElementById('ipinput').value;
    var ipinput_splitted = ipinput.split('/');

    var count = 32 - ipinput_splitted[1];
    var hosts = Math.pow(2, count) - 2;

    var cidr = Math.max(0, Math.min(32, parseInt(ipinput_splitted[1])));

    var netmask = cidr_to_netmask(cidr, 1);
    var ip = string_to_addr(ipinput_splitted[0]);
    var network_address = ip & netmask;
    var broadcast_address = network_address | (~ netmask);
    var first_ip_address = cidr == 31 ? '-' : cidr == 32 ? network_address : network_address + 1;
    var last_ip_address = cidr == 31 ? '-' : cidr == 32 ? network_address : broadcast_address - 1;

    var netmask = cidr_to_netmask(ipinput_splitted[1]);

    document.getElementById('broadcastaddress').innerHTML = addr_to_string(broadcast_address);
    document.getElementById('firstipaddress').innerHTML = isNaN(first_ip_address) ? first_ip_address : addr_to_string(first_ip_address);
    document.getElementById('inversenetmask').innerHTML = addr_to_string(~ string_to_addr(netmask));
    document.getElementById('lastipaddress').innerHTML = isNaN(last_ip_address) ? last_ip_address : addr_to_string(last_ip_address);
    document.getElementById('netmask').innerHTML = netmask;
    document.getElementById('networkaddress').innerHTML = addr_to_string(network_address);
    document.getElementById('numberipaddresses').innerHTML = Math.max(0, hosts);
    document.getElementById('prefix').innerHTML = ipinput_splitted[1];
}

function addr_to_string (addr) {
    var byte1 = (addr >>> 24);
    var byte2 = (addr >>> 16) & 255;
    var byte3 = (addr >>>  8) & 255;
    var byte4 = addr & 255;
    return(byte1 + '.' + byte2 + '.' + byte3 + '.' + byte4);
}

function string_to_addr (s) {
    var masks = s.split('.', 4);
    var num = ((masks[0] & 255) << 24)
                + ((masks[1] & 255) << 16)
                + ((masks[2] & 255) <<  8)
                +  (masks[3] & 255);
    return num;
}

function cidr_to_netmask (cidr, num_flag) {
    cidr = Math.max(0, Math.min(32, parseInt(cidr)));
    var count = cidr;
    var bits = '';
    while (count--) bits += '1';
    count = 32 - cidr;
    while (count--) bits += '0';
    var netmask = parseInt(bits,2);
    if (num_flag)
        return netmask;
    else
        return addr_to_string(netmask);
}
