package MoocTest;
import org.junit.Test;

import static org.junit.Assert.*;//导入静态方法
//import org.junit.Test;

public class TestQ {
    @Test
    public void testq(){
        assertEquals(true,judeEdge(1,2,3));
        Object ob = new Object();
    }
    public static boolean judeEdge(int a ,int b,int c){
        if(a <= 0 || b <= 0 || c<= 0){
            return false;
        }
        if(a+b<c){
            return false;
        }
        if(a+c<b){
            return false;
        }
        if(b+c<a){
            return false;
        }

        return true;

    }
}
