package SocketDemo;

import java.io.*;
import java.net.Socket;

/**
 * @ClassName ClintSocket
 * @Description TODO
 * @Author lxd
 * @Date 2020/7/26 12:01
 * @Version 1.0
 **/
public class ClintSocket {
    public static void main(String[] args) throws IOException {
        Socket so = new Socket("127.0.0.1",5000);
        DataInputStream inFromServer = new DataInputStream(so.getInputStream());

        DataOutputStream outFromServer = new DataOutputStream(so.getOutputStream());

        System.out.println("输入半径数值");
        String outStr,inStr;
        boolean flag = true;
        BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));

        while(flag){
            outStr = bf.readLine();
            outFromServer.writeUTF(outStr);
            outFromServer.flush();

            inStr = inFromServer.readUTF();
            if(!inStr.equals("bye")){
                System.out.println("服务器返回的是" + inStr);
            }else {
                flag = false;
            }

            inFromServer.close();

            outFromServer.close();
            so.close();
        }
    }
}
