package I18n;

import org.junit.Test;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesT {

    @Test
    //读取写入
    public void PropertiesTs(){
        try {
            File fil = null;
            String path = "../I18n/test.properties";
            File file = new File(path);
            if(file.exists()){
                fil.createNewFile();
            }else {
                Properties pps = new Properties();
                FileInputStream fi = new FileInputStream("../I18n/test.properties");
                BufferedInputStream br = new BufferedInputStream(fi);

                //pps.load(fi);
                pps.load(br);
                pps.setProperty("name","liuxudong");
                br.close();

            }

        }catch (IOException e ){
            e.printStackTrace();
        }

    }
}

