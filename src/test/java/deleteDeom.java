import javax.swing.*;
import java.io.*;

/**
 * @ClassName deleteDeom
 * @Description TODO
 * @Author lxd
 * @Date 2020/6/25 15:31
 * @Version 1.0
 **/
public class deleteDeom {
    public static void main(String[] args) {
        try {
            File file = new File("d:\\tempp\\nnn.txt");

            if(! file.exists()){
                file.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream("d:\\tempp\\nnn.txt");
            OutputStreamWriter osw = new OutputStreamWriter(fos);
            BufferedWriter bf = new BufferedWriter(osw);

            bf.write("小乃哦");
            bf.newLine();
            bf.write("ssdff");

            bf.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }
        readFile();

    }

    public static void readFile(){
        try {
            FileInputStream fis = new FileInputStream("d:\\tempp\\nnn.txt");
            InputStreamReader is = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(is);

            String str;
            while((str = br.readLine()) != null){
                System.out.println(str);
            }

        }catch (Exception e){
            e.getMessage();
        }


    }


}
