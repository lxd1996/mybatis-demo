import com.lxd.dao.BillMapper;
import com.lxd.pojo.Bill;
import com.lxd.util.MybatisUtil;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.List;

/**
 * @ClassName BillMapperTest
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/10 15:31
 * @Version 1.0
 **/
public class BillMapperTest {

    @Test
    public void getBillCountByProviderId(){
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        int billCountByProviderId = mapper.getBillCountByProviderId(1);
        System.out.println(billCountByProviderId);
    }

    @Test
    public void add(){
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        Bill bill = new Bill();
        bill.setId(19);
        mapper.add(bill);
    }

    @Test
    public void getBillList() throws Exception {
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        Bill bill = new Bill();
        bill.setId(19);
        String productName = "大豆油";
        String providerId = "6";
        String isPayment = "2";
        Integer startindex = 0;
        Integer pageSize = 30;
        List<Bill> billList = mapper.getBillList(productName, providerId, isPayment, startindex, pageSize);
        for (Bill bi : billList) {
            System.out.println(bi.toString());
        }
    }


    @Test
    public void getBillCount() throws Exception {
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        Bill bill = new Bill();
        bill.setId(19);
        String productName = "大";
        String providerId = "6";
        String isPayment = "2";
        int billCount = mapper.getBillCount(productName, providerId, isPayment);
        System.out.println(billCount);
    }

    @Test
    public void deleteBillById() throws Exception{
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        mapper.deleteBillById(19);
    }

    @Test
    public void getBillById() throws Exception{
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        Bill billById = mapper.getBillById(3);
        System.out.println(billById.toString());
    }

    @Test
    public void modify() throws Exception{
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        Bill bill = new Bill();
        bill.setId(3);
        bill.setProductName("大豆油");
        mapper.modify(bill);
    }

    @Test
    public void deleteBillByProviderId() throws Exception{
        SqlSession sqlSession = MybatisUtil.getSqlSession();
        BillMapper mapper = sqlSession.getMapper(BillMapper.class);
        mapper.deleteBillByProviderId(6);
    }


}
