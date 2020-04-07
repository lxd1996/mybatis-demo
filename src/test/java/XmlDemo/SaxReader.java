package XmlDemo;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.DefaultHandler;
import org.xml.sax.helpers.XMLReaderFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName SaxReader
 * @Description Sax解析xml文档，每次碰到元素的时候就会不断触发startElement,endElement，在实现了DefauleHandler的类中写处理的办法
 * @Author lxd
 * @Date 2020/1/15 20:11
 * @Version 1.0
 **/
public class SaxReader  {
    public static void main(String[] args) throws IOException, SAXException {
        XMLReader parse = XMLReaderFactory.createXMLReader();
        BookHamdler bookHamdler = new BookHamdler();
        parse.setContentHandler(bookHamdler);
        parse.parse("test.xml");
        System.out.println(bookHamdler.getNamelist());
    }
}

class BookHamdler extends DefaultHandler {
    private List<String>  namelist;
    private boolean title = false;

    public List<String> getNamelist(){
        return namelist;
    }
    /**
     * @descriptions: xml文档加载
     * @author: lxd
     * @date: 2020/1/15 20:27
     * @version: 1.0
     */
    public void startDocument(){
        System.out.println("startFocument is start ");
        namelist = new ArrayList<>();

    }
    /**
     * @descriptions: 结束文档
     * @author: lxd
     * @date: 2020/1/15 20:27
     * @version: 1.0
     */
    public void endDocument() {
        System.out.println("End!!!");
    }
    /**
     * @descriptions: 开始访问元素
     * @author: lxd
     * @date: 2020/1/15 20:28
     * @version: 1.0
     */
    public void startElement (String uri, String localName,
                              String qName, Attributes attributes)
            throws SAXException
    {
        if(qName.equals("name")){
            title = true;
        }
    }

    /**
     * @descriptions: 结束访问元素
     * @author: lxd
     * @date: 2020/1/15 20:28
     * @version: 1.0
     */
    public void endElement (String uri, String localName, String qName)
            throws SAXException
    {
        if(title){
            title = false;
        }
    }

    /**
     * @descriptions: 访问正文元素
     * @author: lxd
     * @date: 2020/1/15 20:26
     * @version: 1.0
     */
    public void characters (char ch[], int start, int length)
            throws SAXException
    {
        if(title){
            String bookTitle = new String(ch,start,length);
            System.out.println("Book title "+bookTitle);
            namelist.add(bookTitle);
        }
    }


}
