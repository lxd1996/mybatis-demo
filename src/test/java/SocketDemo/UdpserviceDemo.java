package SocketDemo;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

/**
 * @ClassName UdpserviceDemo
 * @Description TODO
 * @Author lxd
 * @Date 2020/8/8 19:41
 * @Version 1.0
 **/
public class UdpserviceDemo {
    public static void main(String[] args) throws Exception {
        DatagramSocket ds = new DatagramSocket(3000);
        byte[] buf = new byte[1024];
        DatagramPacket dp = new DatagramPacket(buf,1024);

        System.out.println("UPDserv:我再等待消息");

        ds.receive(dp);

        System.out.println("UPDserv:我已经接受到了消息");

        String strRec = new String(dp.getData(),0,dp.getLength())
        +"from "+dp.getAddress().getHostAddress()+":"+dp.getPort();

        System.out.println(strRec);
        Thread.sleep(1000);

        System.out.println("UdpRecv:我要发送消息哈");
        String str = "Hello world！！ client, 你是个碧池";
        DatagramPacket dp2 = new DatagramPacket(str.getBytes(),str.length()
        , InetAddress.getByName("127.0.0.1"),dp.getPort());
        ds.send(dp2);
        ds.close();

    }
}
