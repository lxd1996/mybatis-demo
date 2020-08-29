package SocketDemo;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

/**
 * @ClassName UdpSend
 * @Description TODO
 * @Author lxd
 * @Date 2020/8/8 19:50
 * @Version 1.0
 **/
public class UdpSend {
    public static void main(String[] args) throws Exception {
        DatagramSocket ds = new DatagramSocket();
        String str = "hello world孩子";
        DatagramPacket dp = new DatagramPacket(str.getBytes(),str.length()
                , InetAddress.getByName("121.196.52.151"),3001);
        System.out.println("UPDSend:我要发消息了");
        ds.send(dp);
        System.out.println("UPDSend:我发完成了");

        Thread.sleep(1000);

        byte[] buf = new byte[1024];

        DatagramPacket dp2 = new DatagramPacket(buf,1024);
        System.out.println("UPDSend:我在等消息");
        ds.receive(dp2);
        System.out.println("UPDSend:我收到消息了");

        String str2 = new String(dp2.getData(),0,dp.getLength())
                +"from "+dp.getAddress().getHostAddress()+":"+dp.getPort();
        System.out.println(str2);
        ds.close();
    }
}
