package HRPLicense;


import java.math.BigDecimal;

/**
 * @ClassName test
 * @Description TODO
 * @Author lxd
 * @Date 2020/4/9 8:56
 * @Version 1.0
 **/
public class test {
    public static void main(String[] args) {

//        String str1 = new StringBuilder("计算机").append("软件").toString();
//        System.out.println(str1.intern() == str1);
//
//        String str2 = new StringBuilder("ja").append("va").toString();
//        System.out.println(str2.intern() == str2);
//
//        System.out.println("小虎");
//
        String str = "";
        //BigDecimal bg = new BigDecimal();
        test(null);
        System.out.println();

        int re = 1;
        int abc = 0;
        System.out.println(re< 2 ? "sss":"kkk");
        String str1 = "";
        StringBuffer sql = new StringBuffer();
        sql.append(	"SELECT M.BALANCE BALANCE,\n" +
                        "       M.BUDGET_ID,\n" +
                        "       M.SUBJ_NAME,\n" +
                        "       (select LISTAGG( A.SUBJ_NAME,'-') WITHIN GROUP (ORDER BY  A.P_BUDGET_ID ) AS SUBJ_NAME_FULL from V_BUD_DEPT_ITEM_MERGE A start with BUDGET_ID= M.BUDGET_ID connect by prior A.P_BUDGET_ID=A.BUDGET_ID) AS SUBJ_NAME_FULL,\n" +
                        "       M.QUANTITY,\n" +
                        "       M.SCT_CODE,\n" +
                        "       M.IS_CONTROL,\n" +
                        "       M.PRICE\n" +
                        "    FROM  V_BUD_DEPT_ITEM_MERGE M\n" +
                        "    LEFT JOIN BUD_FROZEN_AMOUNT FA\n" +
                        "          ON FA.BUDGET_ID = M.BUDGET_ID\n" +
                        "    WHERE 1=1\n" +
                        "         AND M.BGT_YEAR = :CURRENT_YEAR\n" +
                        "         AND M.DEPT_CODE = (SELECT A.DEPT_CODE FROM SYS_DEPT_INFO A WHERE A.SERIAL_NO= :DEPT_ID)\n" +
                        "         AND M.IS_CHILD = '1' " +
                        "UNION ALL\n" +
                        "SELECT NVl(M.BALANCE, 0) AS BALANCE,\n" +
                        "       BIL.ITEM_ID AS BUDGET_ID,\n" +
                        "       BIL.ITEM_NAME AS SUBJ_NAME,\n" +
                        "       (SELECT LISTAGG(A.ITEM_NAME,'-') WITHIN GROUP (ORDER BY  A.ITEM_ID ) AS SUBJ_NAME_FULL from BUD_ITEM_LIBRARY A start with A.ITEM_ID= BIL.ITEM_ID connect by prior A.P_ITEM_ID=A.ITEM_ID) AS SUBJ_NAME_FULL,\n" +
                        "       NVL(M.QUANTITY, 0) AS QUANTITY,\n" +
                        "       M.SCT_CODE AS SCT_CODE,\n" +
                        "       BIL.IS_CONTROL AS IS_CONTROL,\n" +
                        "       NVL(M.PRICE, 0) AS PRICE\n" +
//						"       BIL.ITEM_GLOBAL_NO AS BUD_GLOBAL_NO,\n" +
//						"       BIL.IS_CHILD AS IS_CHILD,\n" +
//						"       BIL.ITEM_CODE AS BUD_ITEM_CODE\n" +
                        "  from BUD_ITEM_LIBRARY BIL\n" +
                        "  LEFT JOIN V_BUD_DEPT_ITEM_MERGE M\n" +
                        "    ON M.SUBJ_DETAIL_ID = BIL.ITEM_ID\n" +
                        " where M.BGT_YEAR = :CURRENT_YEAR"
        );
        String str11 ="     SELECT SUM(M.BALANCE) AS BALANCE,  \n" +
                "                   BFP.FUND_PROJECT_ID,  \n" +
                "                   BFP.FUND_PROJECT_NAME,  \n" +
                "                   SUM(M.QUANTITY) QUANTITY,  \n" +
                "                   M.SCT_CODE,  \n" +
                "                   M.IS_CONTROL, \n" +
                "                   SUM(M.PRICE) AS PRICE,   \n" +
                "                   NVL(BFP.PROJECT_GLOBAL_NO,'0'),  \n" +
                "                   M.IS_CHILD, \n" +
                "                   '' AS BUD_ITEM_CODE  \n" +
                "              FROM BUD_FUND_PROJECT BFP\n" +
                "              LEFT JOIN \n" +
                "              V_BUD_DEPT_ITEM_MERGE M ON BFP.FUND_PROJECT_ID = M.FUND_PROJECT_ID\n" +
                "              WHERE 1 = 1 AND BFP.FUND_PROJECT_TYPE = '4'\n" +
                "              AND M.IS_CHILD != 0\n" +
                "             GROUP BY BFP.FUND_PROJECT_ID,BFP.FUND_PROJECT_NAME,M.SCT_CODE,M.IS_CONTROL,BFP.PROJECT_GLOBAL_NO,M.IS_CHILD ";
        System.out.println(str11);
        String sqlString = "\n" +
                "SELECT DISTINCT * FROM (SELECT M.*,\n" + //edit by suihaochuan HRPMTRDEVJAVA-1581
                "  I.SUPPLIER_ID SUPPLIERID,\n" +
                "  I.SUPPLIER_NAME SUPPLIERNAME,\n"+
                //edit begin by WangXiongqi 2017年3月17日19:33:03 HRPMTRDEVJAVA-1625 物资库存按有效期区分不同颜色显示优化
                //计算有效期，将去尾取整改为向上取整
//						"		TRUNC(MONTHS_BETWEEN(EXPIRE_DATE,SYSDATE),0) EXPIRE_MONTHS" +//add by suihaochuan HRPMTRDEVJAVA-1581
                "  (SYSDATE+M.ALARM_DEADLINE) DEADLINE_DATE,\n" +
                "		CEIL(MONTHS_BETWEEN(EXPIRE_DATE,SYSDATE)) EXPIRE_MONTHS" +
                //edit end by WangXiongqi 2017年3月17日19:33:03 HRPMTRDEVJAVA-1625 物资库存按有效期区分不同颜色显示优化
                "  FROM (SELECT M.STOCK_ID,\n" +
                "               (SELECT C.PRICE_LIST_ID\n" +
                "                  FROM MTRL_PRICE_LIST C\n" +
                "                 WHERE C.SUPPLIER_ID = M.SUPPLIER_ID\n" +
                "                   AND C.MTRL_DICT_ID = M.MTRL_DICT_ID\n" +
                "                   AND C.STOP_DATE IS NULL) PRICE_LIST_ID,\n" +
                //add begin by WangXiongqi 2017年3月23日20:00:49 HRPDRTESTJAVA-6478 库存情况查询-按是否收费材料过滤有误
                "               (SELECT MAX(C.CHARGE_STATUS)\n" +
                "                  FROM MTRL_PRICE_LIST C\n" +
                "                 WHERE C.SUPPLIER_ID = M.SUPPLIER_ID\n" +
                "                   AND C.MTRL_DICT_ID = M.MTRL_DICT_ID\n" +
                "                   AND C.STOP_DATE IS NULL) CHARGE_STATUS,\n" +
                //add end by WangXiongqi 2017年3月23日20:00:49 HRPDRTESTJAVA-6478 库存情况查询-按是否收费材料过滤有误
                "				CASE WHEN D.MTRL_TYPE = 'SJ' THEN (SELECT C.ALARM_DEADLINE\n" +
                "                          FROM MTRL_PRICE_LIST C\n" +
                "                         WHERE C.SUPPLIER_ID = M.SUPPLIER_ID\n" +
                "                           AND C.MTRL_DICT_ID = M.MTRL_DICT_ID\n" +
                "                           AND C.STOP_DATE IS NULL\n" +
                "                           AND C.STOP_INDICATOR = '0')\n" +
                "                         ELSE NULL END AS ALARM_DEADLINE,\n" +
                "               S.STORAGE_PROFILE_ID,\n" +
                "               M.STORAGE_ID,\n" +
                "               (SELECT C.STORAGE_NAME\n" +
                "                  FROM MTRL_STORAGE_DEPT C\n" +
                "                 WHERE C.STORAGE_ID = M.STORAGE_ID) STORAGE_NAME,\n" +
                "               M.SUPPLIER_ID,\n" +
                "               (SELECT C.SUPPLIER_NAME\n" +
                "                  FROM V_MTRL_SUPPLIER_CATALOG_MAIN C\n" +
                "                 WHERE C.SUPPLIER_ID = M.SUPPLIER_ID) SUPPLIER_NAME,\n" +
                "               M.MTRL_DICT_ID,\n" +
                "               M.MTRL_NAME,\n" +
                "               M.MTRL_CODE,\n" +
                //Edit begin by wangxiani HRPMTRDEVJAVA-1303  物资库存情况查询增加批号显示，打印报表也增加批号显示 2016年8月31日10:50:50
                "               DECODE(M.BATCH_NO, NULL, 'XXXX', M.BATCH_NO) BATCH_NO,\n" +
                //Edit end by wangxiani 2016年8月31日10:50:50
                "               M.MTRL_SPEC,\n" +
                "               M.MTRL_MODEL,\n" +
                "               DECODE(M.FROZEN_FLAG,1,'是','否') FROZEN_FLAG,\n" +
                "               M.PURCHASE_PRICE,\n" +
                "               M.QUANTITY,\n" +
                "               M.PURCHASE_PRICE * MI.CURR_QUANTITY TOTAL_PRICE,\n" +
                "               M.SUPPLY_INDICATOR,\n" +
                "               M.CREATOR,\n" +
                "               M.CREATOR_NAME,\n" +
                "               M.CREATE_DATE,\n" +
                "               M.UPDATER,\n" +
                "               M.UPDATER_NAME,\n" +
                "               M.UPDATE_DATE,\n" +
                "               S.SUB_STORAGE_ID,\n" +
                "               D.ATTR_ID,\n" +
                "               (SELECT CLASS_GLOBAL_NO\n" +
                "                  FROM MTRL_CLASS_DICT\n" +
                "                 WHERE CLASS_ID = D.CLASS_ID) CLASS_GLOBAL_NO,\n" +
                "               D.UNITS,\n" +
                "               D.INPUT_CODE,\n" +
                "               (SELECT H.ITEM_NAME\n" +
                "                  FROM SYS_CODE_ITEM H\n" +
                "                 WHERE H.ITEM_ID = D.UNITS\n" +
                "                   AND H.DICT_ID = '9000') UNITS_NAME,\n" +
                "               S.PACKAGE_UNITS,\n" +
                "               S.AMOUNT_PER_PACKAGE,\n" +
                "               S.LOCATION,\n" +
                "               (SELECT C.SUB_STORAGE\n" +
                "                  FROM MTRL_SUB_STORAGE_DICT C\n" +
                "                 WHERE C.SUB_STORAGE_ID = S.SUB_STORAGE_ID) SUB_STORAGE,\n" +
                "               (SELECT H.ITEM_NAME\n" +
                "                  FROM SYS_CODE_ITEM H\n" +
                "                 WHERE H.ITEM_ID = S.PACKAGE_UNITS\n" +
                "                   AND H.DICT_ID = '9000') PACKAGE_UNITS_NAME,\n" +
                "				MI.CURR_QUANTITY,\n"+
                //edit start by suihaochuan 2017年2月16日09:48:37
                //HRPMTRDEVJAVA-1581 物资库存情况查询增加过滤条件“有效期”，并用颜色区分有效期情况
                "				(SELECT MAX(MID.EXPIRE_DATE)\n" +
                "                  FROM MTRL_IMPORT_DETAIL MID \n" +
                "                 WHERE MID.MTRL_DICT_ID = M.MTRL_DICT_ID\n" +
                "                   AND MID.SUPPLIER_ID = M.SUPPLIER_ID\n" +
                "                   AND MID.BATCH_NO = M.BATCH_NO\n" +
                "                   AND MID.PURCHASE_PRICE = M.PURCHASE_PRICE \n" +
                "                ) EXPIRE_DATE" +
                //edit end by suihaochuan
                //Edit begin by PanWeidong 2017-01-03 10:22
                //HRPMTRDEVJAVA-1521 物资系统物资检索支持别名拼音码检索
                "       ,D.MTRL_ALAIS\n"+
                //Edit end by PanWeidong 2017-01-03 10:22
                "		 ,D.MTRL_TYPE \n" +
                "		 ,MS.SUPPLIER_ID USER_SUPPLIER_ID \n"+
                "		 ,MSD.BUSINESS_NAME  MTRL_TYPE_NAME\n" +
                "                FROM MTRL_STOCK M\n" +
                "               INNER JOIN MTRL_DICT D\n" +
                "                  ON M.MTRL_DICT_ID = D.MTRL_DICT_ID\n" +
                "               INNER JOIN MTRL_SYS_DICT MSD\n" +
                "                  ON MSD.BUSINESS_VALUE = D.MTRL_TYPE\n" +
                "                 AND MSD.BUSINESS_TYPE = 'MTRL_DICT_MTRL_TYPE'\n" +
                "                LEFT JOIN MTRL_STORAGE_PROFILE S\n" +
                "                  ON M.MTRL_DICT_ID = S.MTRL_DICT_ID\n" +
                "                 AND M.STORAGE_ID = S.STORAGE_ID\n" +
                "                LEFT JOIN MTRL_CLASS_DICT C\n" +
                "                  ON D.CLASS_ID = C.CLASS_ID\n" +
                "                LEFT JOIN (SELECT R.STORAGE_ID,\n" +
                "                                 F.MTRL_DICT_ID,\n" +
                "                                 F.SUPPLIER_ID  FIRM_ID,\n" +
                "                                 F.BATCH_NO,\n" +
                "                                 F.PURCHASE_PRICE,\n" +
                "                                 NVL(SUM(F.CURR_QUANTITY), 0) CURR_QUANTITY\n" +
                "                            FROM MTRL_IMPORT_MASTER R, MTRL_IMPORT_DETAIL F\n" +
                "                           WHERE R.IMPORT_MASTER_ID = F.IMPORT_MASTER_ID\n" +
                "                             AND R.ACCOUNT_INDICATOR = 1\n" +
                "                             AND F.CURR_QUANTITY >= 0\n" +
                "                           GROUP BY F.MTRL_DICT_ID,\n" +
                "                                    F.SUPPLIER_ID,\n" +
                "                                    F.BATCH_NO,\n" +
                "                                    R.STORAGE_ID,\n" +
                "                                    F.PURCHASE_PRICE"+ ") MI\n" +
                "                  ON M.MTRL_DICT_ID = MI.MTRL_DICT_ID\n" +
                "                 AND M.SUPPLIER_ID = MI.FIRM_ID\n" +
                "                 AND M.BATCH_NO = MI.BATCH_NO\n" +
                "                 AND M.PURCHASE_PRICE = MI.PURCHASE_PRICE\n" +
                "                 AND M.STORAGE_ID = MI.STORAGE_ID \n"+
                "                 LEFT JOIN MTRL_PRICE_LIST P ON D.MTRL_DICT_ID = P.MTRL_DICT_ID\n" +
                "                 LEFT JOIN MTRL_SUPPLIER_PRODUCT_INFO MS ON P.MTRL_PRODUCT_ID =MS.PRODUCT_ID \n"+
                ") M,\n"+
                "(SELECT DISTINCT D.MTRL_DICT_ID,\n" +
                "               D.PURCHASE_PRICE,\n" +
                "               DECODE(D.BATCH_NO,NULL,'XXXX',D.BATCH_NO) BATCH_NO,\n" +
                "               D.SUPPLIER_ID PRODUCER_ID,\n" +
                "               M.SUPPLIER_ID,\n" +
                "               M.SUPPLIER_NAME\n" +
                "          FROM MTRL_IMPORT_DETAIL D\n" +
                "         INNER JOIN MTRL_IMPORT_MASTER M\n" +
                "            ON D.IMPORT_MASTER_ID = M.IMPORT_MASTER_ID\n" +
                "        AND M.ACCOUNT_INDICATOR=1\n" +
                "        AND D.CURR_QUANTITY>0\n"+
                "           AND M.STORAGE_ID = :STORAGE_ID) I  "+
                "    WHERE  M.CURR_QUANTITY>0 \n"+
                "   AND M.MTRL_DICT_ID = I.MTRL_DICT_ID(+)\n" +
                "   AND M.SUPPLIER_ID = I.PRODUCER_ID(+)\n" +
                "   AND M.PURCHASE_PRICE = I.PURCHASE_PRICE(+)\n" +
                "   AND M.BATCH_NO = I.BATCH_NO(+)\n" +
                " AND M.STORAGE_ID = :STORAGE_ID";
        System.out.println(sqlString);

    }
    private static void test(BigDecimal bg){


    }
}
