package SocketDemo;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Map;

/**
 * @ClassName ServerSocker
 * @Description TODO
 * @Author lxd
 * @Date 2020/7/26 12:01
 * @Version 1.0
 **/
public class ServerSockerDemo {
    public static void main(String[] args) throws IOException {
        System.out.println("等待连接");

        ServerSocket socket = new ServerSocket(5000);
        Socket accept = socket.accept();
        System.out.println("连接的是来自于"+accept.getInetAddress().getHostAddress());
        DataInputStream inFromClient = new DataInputStream(accept.getInputStream());

        DataOutputStream outFromClient = new DataOutputStream(accept.getOutputStream());

        Double radius,area;
        String str;
        boolean flag = true;
        while (flag){
            str = inFromClient.readUTF();
            if(!str.equals("bye")) {
                radius = Double.parseDouble(str);

                System.out.println("接收到的半径是" + radius);

                area = radius * radius * Math.PI;
                str = Double.toString(area);

                //开始写数据

                outFromClient.writeUTF(str);

                outFromClient.flush();

                System.out.println("元的面积已经发送啊"+area);

            }else {
                flag = false;
                outFromClient.writeUTF("bye");
                outFromClient.flush();
            }

        }
        inFromClient.close();
        outFromClient.close();
        socket.close();

    }
}
