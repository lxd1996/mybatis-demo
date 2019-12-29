/** 
说明：资产信息增加
作者：邓文斌
时间：2015年1月22日14:34:33
修改：修改附件，修改路径格式
时间：2015年11月23日15:32:42
作者：齐晓冬
任务：HRPASSETDEVJAVA-1709，HRPASSETDEVJAVA-1708
 */
var action = "AssetBasicInfoAddHandler.jspx?moduleNo=" + moduleNo + "&op=";
var electronicAction = "../AssetElectronicManage/AssetElectronicManageHandler.jspx?moduleNo=" + moduleNo + "&op=";
var comboBoxActionUrl = "../../../Comm/ComboBoxHandler.jspx?op=";
var comboGridActionUrl = "../../../Comm/ComboGridHandler.jspx?op=";	
var actionComm ="../../AssetComm/AssetCommHandler.jspx?moduleNo=" + moduleNo + "&op=";
var showCodeNo = 1;
var code_name = "";
var code68 = "";
var code32 = "";
var loginInfo;
var page_level = 2;
var isUseCard;
var asset_id = "";
var changeFlag;
var timestamp = "";
var isEditAssetInfo = "";//用户是否拥有资产信息修改的权限
var isLoadLessUser = false;
var trustee = "" ; // 保管人ID
var tempTrustee = "" ; // 保存请求回来的保管人
//edit start by suihaochuan 2016年12月27日11:32:01
//HRPASSETDEVJAVA-2127 资产用途增加是否必填判断
var useRequired;
//edit end by suihaochuan
var editIndex = undefined;
var asset_dict_id="";
var isCountryCategory = "";
var isShowParentDept = true; // 是否显示使用部门下拉框父级部门，默认显示
var isShowAssetVsCmps = "";
var vu;
var assetTypeDictId = "";
var ASSET_OUTGOING_DEAL_CONTENT='';
var isUseAdressDict='';
var importDate;
$(document).ready(function() {
	var getUrl = getHttpURLParam();
	asset_id = getUrl["ASSET_ID"];
	asset_dict_id=getUrl["ASSET_DICT_ID"];
    var parameters=getParameter("20408,6133");
    ASSET_OUTGOING_DEAL_CONTENT = parameters['20408'];
    isUseAdressDict=parameters['6133'];
    isUseAdressDict=parameters['6133'];
    if(ASSET_OUTGOING_DEAL_CONTENT==null){
        $('#ctrlApplyNo').css('display','none');
        // $('#ctrlApplyNo').remove();
    }else if(ASSET_OUTGOING_DEAL_CONTENT.indexOf("APPLY_NO")!=-1){
        // $('#ctrlApplyNo').css('display','block');
        $('#ctrlApplyNo').clone();
    }else{
        $('#ctrlApplyNo').css('display','none');
    }
	//edit by tian bo 2017年08月21日11:32:01
	loginInfo = getLoginInfo();
    isShowParentDept = doQuerySysParam('6105') == 1 ? true : false;
	initPage();
    initCommon();
    if(asset_id==""||asset_id==null||asset_id==undefined||asset_id.toUpperCase()=="NULL")
	{
    	timestamp = (new Date()).valueOf();
    	changeFlag = 3;
    	initAdd();   
    	$("#btnAssetImportPrint").hide();
	}else{
		changeFlag = 0;
		initEdit(); 
		initAedCode("");
		initLocationAed("");	
		doQueryInfo();
		setTimeout(function() {
			timeOutFun();
		}, 1000);
		doQueryAssetPart();
		doQueryAssetVsCpms();
    	$("#btnAssetImportPrint").show();
	}
	//edit start by suihaochuan 2016年12月27日11:32:36
    //HRPASSETDEVJAVA-2127 资产用途增加是否必填判断
    var paramArr = getParameter("6082,6102,6113,11026");
	useRequired= paramArr['6082'];
	isCountryCategory= paramArr['6113'];
	isLoadLessUser = paramArr['6102']>0?true:false;
	isShowAssetVsCmps =paramArr['11026'];
	if(useRequired == "0"){
		$('#lblUseRequired').hide();
	}else{
		$('#lblUseRequired').show();
	}
	if(isCountryCategory=="0"){
		$('#iscountrycategory').hide();
	}else{
		$('#iscountrycategory').show();
	}
	var ctabCmpsAsset = $('#tt').tabs('getTab', "关联合同").panel('options').tab;
	if(isShowAssetVsCmps=="0"){
		ctabCmpsAsset.hide();
	}else{
		ctabCmpsAsset.show();
	}
	//edit end by suihaochuan
	vu = new Vue({
		el:'#assetInfoExt',
		data:{
			// mode:asset_id?'edit':'add',
            mode:'edit',
		    assetId:asset_id,
			assetTypeDictValue : {
				assetTypeDict : assetTypeDictId
			},
			sdsEnableFlag: false
		},
		methods: {
			onReady: function(customView, flag){
				this.sdsEnableFlag = flag;
                $('#custom-mask').length && ($('#custom-mask')[0].style.display = 'none');
			}
		}
	});

    initPriceCtr();
});

function initPriceCtr(){
    $("#txtPrice").numberbox({
        onChange:function(newValue,oldValue) {
            //如果值不为空，对经费来源进行判断，如果有多个，不处理，如果只选择了一个，则将单价赋值到经费来源列表中
            var rowsInfo= $("#dgFundSource").datagrid("getRows");
            if(newValue!=''&&newValue!=null&&newValue!=undefined){
                var fundSourceInfos=$('#cmbFundSource').combobox('getValue');
                var fundSourceInfoArray=[];
                if(fundSourceInfos!=undefined){
                    fundSourceInfoArray=fundSourceInfos.split(',');
                }
                if(fundSourceInfoArray.length==1){
                    //将单价赋值到经费来源列表中
                    endEditing();
                    rowsInfo[0].FUND_PRICE=newValue;
                    updateOneRowProportion(newValue,rowsInfo[0],0);
                }
            }
        }
    });
}

/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化基本信息
 * 作者：邓文斌
 * 时间：2015年1月22日14:36:33
 * returnType：void
 * </pre>
 */
function initPage() {
	//用户是否拥有查看重要信息的权限
	var paraValue = doQueryAssetPerm("545-1");
	isEditAssetInfo = doQueryAssetPerm("545-3");//用户是否拥有资产信息修改的权限
	if (!paraValue) {
		$('#asset_important_info1').hide();
		$('#asset_important_info2').hide();
	}
	//是否启用卡片号/条码
	isUseCard = doQuerySysParam(6024);
	//edit begin zhaoweijuan 2015年4月17日17:32:11 HRPASSETDEVJAVA-1238
	if (isUseCard == "0") {
		$('#trCard').hide();
		$('#trCard1').hide();
		$('#trAssetNo').show();
		$('#trAssetNo1').show();
	}else{
		$('#trCard').show();
		$('#trCard1').show();
		$('#trAssetNo').hide();
		$('#trAssetNo1').hide();
	}
	//edit end zhaoweijuan 2015年4月17日17:32:11 HRPASSETDEVJAVA-1238
	//初始化相关文字
	$('#lblAssetType1').text(setReplaceContrastData($('#lblAssetType1').text()));
	$('#lblAssetSubType1').text(setReplaceContrastData($('#lblAssetSubType1').text()));
	$('#lblAssetAssetNo').text(setReplaceContrastData($('#lblAssetAssetNo').text()));
	$('#lblIsImportAsset').text(setReplaceContrastData($('#lblIsImportAsset').text()));
	$('#labAssetGenre').text(setReplaceContrastData($('#labAssetGenre').text()));
	$('#labDeviceType').text(setReplaceContrastData($('#labDeviceType').text()));
	
	$("#lbl_Asset_Barcode_Name1").text(ASSET_BARCODE_NO_NAME);
	//edit begin 李文康 增加资产区域 2015年3月30日17:21:36 HRPASSETDEVJAVA-1188
	$('#lblAssetArea').text(setReplaceContrastData($('#lblAssetArea').text()));	
	//edit end 李文康 增加资产区域  2015年3月30日17:21:39 HRPASSETDEVJAVA-1188	
	//第一个选项卡“资产信息”
	var tab = $('#tab_center').tabs('getTab', 0);
	$('#tab_center').tabs('update', {
		tab : tab,
		options : {
			title : setReplaceContrastData("资产信息")
		}
	});
}
//edit by zhaoweijuan 2015年3月4日15:00:07 HRPASSETDEVJAVA-1121
//单价变动设置
function doSetPrice(){
	var tmp_price = $('#txtPrice').val();
	if (tmp_price == null || tmp_price == undefined || tmp_price+"" == "") {
		$("#txtPrice").numberbox('setValue', '0.00');
	}
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化initCommon()
 * 作者：邓文斌
 * 时间：2015年1月22日14:36:33
 * returnType：void
 * </pre>
 */
function initCommon(){
	initDateBox();
	initComboTree();
	initCombox();
	initAssetType();//初始化资产类别
	//Edit begin by PanWeidong 2016-09-30 11:22
	//HRPMTRDEVJAVA-1375 资产信息维护界面直接选择资产名称，资产大类，子类自动添加到界面上（目前必须先选择大类，子类，才能选择资产名称，影响效率）
	initSubType();
	initCombogrid();
	$("#cmbAssetType").combobox('disable');
	$("#cmbAssetSubType").combobox('disable');
	//Edit end by PanWeidong 2016-09-30 11:22
	//edit begin 李文康  新增附属设备的维护 2015年10月9日11:52:10 HRPASSETDEVJAVA-1646
	initGrid();
	//edit end 李文康  新增附属设备的维护 2015年10月9日11:52:15 HRPASSETDEVJAVA-1646
	//Edit begin by panWeidong HRPCOMMERCIALBUGJAVA-2344 2016-11-11 13:47
	//资产信息管理界面与资产入库处理界面，资产管理折旧（月份），核算折旧（月份），根据时间自动计算，详见附件说明 
	$("#txtUseYears").blur(function(){
		var use_years_1 = $('#txtUseYears').val();
		var depreciation_method2 = $('#cmbDepreciationMethod2').combobox('getValue'); // 管理折旧方法
		if (depreciation_method2 != "516-1" && depreciation_method2 != "516-6") {
			$('#txtDepreciationMonths2').numberbox('setValue', Number(use_years_1) * 12);// 管理折旧年限
		}
		var depreciation_method = $('#cmbDepreciationMethod').combobox('getValue'); // 管理折旧方法
		if (depreciation_method != "516-1" && depreciation_method != "516-6") {
			$('#txtDepreciationMonths').numberbox('setValue', Number(use_years_1) * 12);// 核算折旧年限
		}
	});
	//Edit end by panWeidong HRPCOMMERCIALBUGJAVA-2344 2016-11-11 13:47
	$("#txt_effective_time").blur(function(){
		var addMonth = document.getElementById("txt_effective_time").value;
		if(importDate!=undefined && importDate !=null && importDate !=''&& addMonth!=undefined && addMonth !=null && addMonth !=''){
			var resultDate = new Date(dateFormatterYMD(importDate));
			resultDate.setMonth(parseInt(resultDate.getMonth())+parseInt(addMonth)); 
			$("#txtGuaranteeDate").datetimepicker({
				value : dateFormatterYMD(resultDate)
			});
		}
	});
	$("#txtGuaranteeDate").blur(function(){
		$("#txt_effective_time").val('');
	});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:初始化initGrid
* 作者:李文康
* 日期:2015年10月9日 上午11:53:46
* </pre>
 */
function initGrid(){
	// 资产附属设备信息
	$("#dgAssetBasicPart").datagrid({
		fit : true,
		toolbar : "#assetPartTool",
		columns : createAssetPartColumns(),
		rownumbers : true,
		//Edit begin by PanWeidong 2016-07-01 14:32
		//HRPDRTESTJAVA-4206  基本信息维护，附属资产维护，未做数量限制，目前输入过大数量无保存，见附件。
//		pagination : true,
		//Edit end by PanWeidong 2016-07-01 14:32
		singleSelect : true,
		onLoadError : onLoadError, // iframe-common.js已定义
		onLoadSuccess : onLoadSuccess
	});
	//初始化经费来源datagrid 
	//add by wangxiani 2017年3月2日11:14:52 HRPASSETDEVJAVA-2176
	$("#dgFundSource").datagrid({
		fit : true,
		singleSelect : true,
		queryParams :{"assetId" : asset_id},
		url : action + 'doQueryFundSource',
		columns : createFundSourceColumns(),
		onClickRow : onClickFundSourceRow,
		rownumbers : true,
		pagination : true,
		onLoadError : onLoadError, // iframe-common.js已定义
		onLoadSuccess : onLoadSuccess// iframe-common.js已定义
	});
	//
	$('#dgRelation').datagrid({
		fit : true,
		nowrap : true,
		striped : true,
		toolbar : "#relationToolBar",
		rownumbers : true,
		singleSelect : true,
		collapsible : false,
		columns : creatDgRelationColumst(),
		onBeforeLoad:function(param){
			
		}
	});
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-2176
 * 描述：创建经费来源网格列
 * 作者：wangxiani
 * 时间：2017年3月2日11:16:35
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function createFundSourceColumns(){
	var columns = [ [  {
		field : 'FUND_SOURCE_ID',
		title : '经费来源ID',
		hidden : true
	}, {
		field : 'ASSET_ID',
		title : '资产ID',
		hidden : true,
		align : 'center'
	}, {
		field : 'FUND_SOURCE',
		title : '经费类型',
		hidden : true,
		align : 'center'
	}, {
		field : 'FUND_SOURCE_NAME',
		title : '经费来源',
		width : 150,
		halign : 'center',
		align : 'left'
	}, {
		field : 'FUND_PRICE',
		title : '金额',
		width : 80,
		formatter : quantityFormatter,
		halign : 'center',
		align : 'right',
		editor : {
			type : 'numberbox',
			options : {
				required : true,
				validType : 'length[0,15]',
				precision:2						
			}
		}
	}, {
		field : 'PRICE',
		title : '购入单价',
		hidden : true,
		align : 'center'
	}, {
		field : 'FUND_PROPORTION',
		title : '所占比例',
		width : 100,
		halign : 'center',
		align : 'right',
		formatter:function(value,row,index){
			if(row.PRICE == 0 || row.PRICE == 0){
				return "";
			}else if(row.PRICE && row.FUND_PRICE){
				return (row.FUND_PRICE/row.PRICE*100).toFixed(2)+"%";
			}else{
				return "";
			}
		}
	}, {
		field : 'SCI_ID',
		title : '项目ID',
		hidden : true,
		align : 'center'
	}, {
		field : 'SCI_NAME',
		title : '项目',
		width : 200,
		halign : 'center',
		align : 'left',
		editor : {
			type : 'combobox',
			options : {
				required : false,
				url : comboBoxActionUrl + "getComboBox",
				valueField : 'id',
				textField : 'text',
				panelHeight : 125,
				editable:true,
				onBeforeLoad : function(param) {
					param.table = "ASSET_SCI_PROJECT_DICT";
					param.id = "SCI_ID";
					param.text = "SCI_NAME";
					param.sort = "INPUT_CODE";
					param.order = "ASC";
					param.where = " AND FUND_SOURCE = '"
						+$('#dgFundSource').datagrid('getSelected').FUND_SOURCE+"'";
				}
			}
		}
	}] ];
	return columns;
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:查询附属设备信息
* 作者:李文康
* 日期:2015年10月10日 下午3:24:25
* </pre>
 */
function doQueryAssetPart(){
	$("#dgAssetBasicPart").datagrid({
		url : action + "doQueryAssetPart",
		queryParams : {
			"assetId" : asset_id
		},
        pageNumber: 1
	});
}
function doQueryAssetVsCpms(){
	$("#dgRelation").datagrid({
		url : action + "doQueryAssetVsCpms",
		queryParams : {
			"assetId" : asset_id
		},
        pageNumber: 1
	});
}

function creatDgRelationColumst(){
	var columns = [ [ {
		field : "CPMS_VS_ASSET_ID",
		title : "合同资产对照ID",
		width : 100,
		hidden : true
	},{
		field : "CPMS_ID",
		title : "合同ID",
		width : 100,
		hidden : true
	}, {
		field : "CPMS_NO",
		title : "合同编号",
		width : 130,
		align : 'center',
		sortable : true 
	} ,{
		field : "CPMS_NAME",
		title : "合同名称",
		width : 130,
		align : 'left',
		halign : "center",
		sortable : true
	},  {   
		field : "CP_TYPE_DICT",
		title : "合同类型",
		width : 100,
		align : 'left',
		halign : "center"
	}, {
		field : "CPMS_TOTAL_AMOUNT",
		title : "总金额",
		width : 100,
		align : 'left',
		halign : "center",
		formatter : amountFormatter
	}, {
		field : "CPMS_START_DATE",
		title : "开始日期",
		width : 130,
		align : 'center',
		halign : "center",
		sortable : true 
	}, {
		field : "CPMS_END_DATE",
		title : "结束日期",
		width : 130,
		align : 'center',
		halign : "center",
		sortable : true 
		}
	   ] ];
	return columns;
	
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:创建附属设备信息列
* 作者:李文康
* 日期:2015年10月9日 上午11:56:23
* @returns {Array}
* </pre>
 */
function createAssetPartColumns() {
	var columns = [ [
	        {
				field : "PART_ID",
				title : "流水主键",
				halign : "center",
				align : "center",
				width : 100,
				hidden : true
			},{
				field : "ASSET_ID",
				title : setReplaceContrastData("资产ID"),
				halign : "center",
				align : "center",
				width : 100,
				hidden : true
			},{
				field : "IMPORT_NO",
				title : "入库单号",
				halign : "center",
				align : "left",
				width : 150,
				hidden : true
			},{
				field : "PART_BAR_CODE",
				title : "附属设备条码",
				halign : "center",
				align : "left",
				width : 150,
				hidden : true
			},{
				field : "PART_ASSET_NAME",
				title : "附属设备名称",
				halign : "center",
				align : "left",
				width : 150
			},{
				field : "PART_SPEC",
				title : "规格",
				halign : "center",
				align : "left",
				width : 100
			}, {
				field : "PART_TYPE",
				title : "型号",
				halign : "center",
				align : "left",
				width : 100
			},{
				field : "PART_AMOUNT",
				title : "数量",
				halign : "center",
				align : "right",
				width : 80
			}, {
				field : "PART_PRICE",
				title : "单价",
				halign : "center",
				align : "center",
				width : 100,
				formatter : amountFormatter
			}, {
				//edit start by suihaochuan 2017年1月13日14:12:09
				//HRPASSETDEVJAVA-2142 资产入库处理和资产信息维护增加“出厂编号”和“安装位置”的维护，并在资产信息维护模块资产信息查看时展示
				field : "PART_SEQ_NO",
				title : "出厂编号",
				halign : "center",
				align : "right",
				width : 100
			}, {
				field : "PART_INSTALL_LOCATION",
				title : "安装位置",
				halign : "center",
				align : "left",
				width : 120
				//edit end by suihaochuan
			}, {
				field : "PART_IMPORT_INDICATOR",
				title : "入库标识",
				halign : "center",
				align : "center",
				width : 100,
				hidden : true
			}, {
				field : "PART_MEMO",
				title : "备注说明",
				halign : "center",
				align : "left",
				width : 120
			},{
				field : "PART_STATUS",
				title : "附属设备状态",
				halign : "center",
				align : "left",
				width : 120,
				hidden : true
			}, {
				field : "IMPORT_TYPE",
				title : "入库方式",
				halign : "center",
				align : "center",
				width : 120,
				hidden : true
			}, {
				field : "IMPORT_DATE",
				title : "入库日期",
				halign : "center",
				align : "center",
				width : 120,
				formatter : function(value, row, index) {
					if (value != null && value != undefined && value != "") {
						return dateFormatterYMD(value);
					}
				}
			}, {
				field : "UNITS_NAME",
				title : "单位",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "COUNTR_NAME",
				title : "国别",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "CONTARCT_NO",
				title : "合同号",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "INVOICE_NO",
				title : "发票号",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "INVOICE_DATE",
				title : "发票日期",
				halign : "center",
				align : "center",
				width : 120,
				formatter : function(value, row, index) {
					if (value != null && value != undefined && value != "") {
						return dateFormatterYMD(value);
					}
				}
			}, {
				field : "MANUFACTURER_NAME",
				title : "生产厂家",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "SUPPLIER_INFO_NAME",
				title : "供货单位",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "ASSIGNEE",
				title : "经办人",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "RECEIVER",
				title : "接收人",
				halign : "center",
				align : "center",
				width : 120
			} , {
				field : "PART_BRAND",
				title : "品牌",
				halign : "center",
				align : "left",
				width : 90
			}, {
				field : "PRODUCTION_DATE",
				title : "出厂日期",
				halign : "center",
				align : "center",
				width : 120,
				formatter : function(value, row, index) {
					if (value != null && value != undefined && value != "") {
						return dateFormatterYMD(value);
					}
				}
			}, {
				field : "CREATE_NAME",
				title : "创建人",
				halign : "center",
				align : "center",
				width : 90
			}, {
				field : "CREATE_DATE",
				title : "创建时间",
				halign : "center",
				align : "center",
				width : 120
			}, {
				field : "UPDATE_NAME",
				title : "修改人",
				halign : "center",
				align : "center",
				width : 90
			}, {
				field : "UPDATE_DATE",
				title : "修改时间",
				halign : "center",
				align : "center",
				width : 120
			}
			] ];
	return columns;
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化日期控件
 * 作者：邓文斌
 * 时间：2015年1月22日14:36:33
 * returnType：void
 * </pre>
 */
function initDateBox() {
	initDatePicker("#txtGuaranteeDate", false);
	initDatePicker("#timeStartUsingDate", false);
	initDatePicker("#timeProductDate", false);
	initDatePicker("#txtBuyDate", false);
	initDatePicker("#timeCertificateDueDate", false);
	initDatePicker("#timeAcceptDate", false);
	initDatePicker("#timeRecipientsDate", false);
	initDatePicker("#timeDepreciationDate", false);
	initDatePicker("#timeDepreciationDate2", false);
	//edit begin zhaoweijuan 2015年1月27日15:31:52 HRPASSETDEVJAVA-1044
	initDatePicker("#timeAppDate", false);
	initDatePicker("#timeAppInvalidDate", false);
	initDatePicker("#timeSetupDate", false);
	//edit end zhaoweijuan 2015年1月27日15:31:52 HRPASSETDEVJAVA-1044
	$("#timeDepreciationDate").width(140);
	$("#timeDepreciationDate2").width(140);
	$("#txtGuaranteeDate").width(140);
	$("#timeStartUsingDate").width(140);
	$("#timeProductDate").width(140);
	$("#txtBuyDate").width(140);
	$("#timeCertificateDueDate").width(140);
	$("#timeAcceptDate").width(140);
	$("#timeRecipientsDate").width(140);
	//edit begin zhaoweijuan 2015年1月27日15:31:52 HRPASSETDEVJAVA-1044
	$("#timeAppDate").width(140);
	$("#timeAppInvalidDate").width(140);
	$("#timeSetupDate").width(140);
	//edit end zhaoweijuan 2015年1月27日15:31:52 HRPASSETDEVJAVA-1044
	//edit begin by 李宇 2016年6月21日10:58:59 初始化附属设备入库日期
	initDatePicker("#dateImportDate", false);
	$("#dateImportDate").width(139);
	initDatePicker("#dateInvoiceDate", false);
	$("#dateInvoiceDate").width(139);
	//edit end by 李宇 2016年6月21日10:58:59 初始化附属设备入库日期
	initDatePicker("#dateProductionDate", false);
	$("#dateProductionDate").width(139);
	//edit end by tianbo 2017年8月11日10:58:59 初始化附属设备出厂日期
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化initComboTree() 
 * 作者：邓文斌
 * 时间：2015年1月22日14:36:33
 * returnType：void
 * </pre>
 */
function initComboTree() {
	initComboxDeptTree('#cmbDept', false, "M");

	//var dept_id = loginInfo.DEPT_ID;
	//$('#deptInvoiceManager').combobox('setValue', dept_id);
	//initComboxDeptTree('#cmbExportDept_search', false, "U");// 初始化出库申请出库科室
	//initComboxDeptTree('#cmbDept', true, "M");
     if (isShowParentDept){
         initComboxDeptTree('#cmbUseDept', false, 'U');
     } else {
         initComboxDeptTree('#cmbUseDept', false, 'U', '', ' AND V.IS_CHILD = 1 ');
     }
	 initComboxDeptTree('#cmbLocationDept', false, "U");
	initImpTypeCombobox();
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化initCombox()
 * 作者：邓文斌
 * 时间：2015年1月22日14:42:30
 * returnType：void
 * </pre>
 */
//edit begin 齐晓冬 2015年12月9日14:19:05 修改combobox高度 HRPDRTESTJAVA-2763
function initCombox() {
	//送修标记
	$("#cmbRepairFlag").combobox({
		valueField : "id",
		textField : "text",
		editable : false,
		panelHeight : 70,
		data : [ {
			"id" : "1",
			"text" : "是"
		}, {
			"id" : "0",
			"text" : "否 "
		} ],
		value : ""
	});
    //初始化安装位置信息
    initInstallLocationInfo('#cmbInstallLocation',isUseAdressDict,'#ctrAdress','#ctrAdress1','1');

    //使用部门
	$("#cmbUseDept").combobox({
		onSelect : function(newVal) {
				queryTrustee(newVal.id);// 查询保管人
				initAedCode(newVal.id);//初始化使用房间
				if(isLoadLessUser){
					initTustee(newVal.id,trustee);//初始化保管人
				}
		}
	});
	if(!isLoadLessUser)
	{
		initTustee("",trustee);
	}
	//定位部门
	$("#cmbLocationDept").combobox({
		onChange : function(newVal, oldVal) {
			initLocationAed(newVal);//初始化定位房间
		}
	});
	//单位
	$('#cmbUnits').combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 130,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '517'";
		}
	});
	//质控等级
	$('#cmbQualityGrade').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 100,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '519'";
		}
	});
	//管理分类
	$('#cmbCategory').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 100,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '520'";
		}
	});
	//用途
	$('#cmbUsage').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 150,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '522'";
		}
	});
	//资产分类
	$('#cmbDeviceType').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 150,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '580'";
		}
	});
	//资产状态
	$('#cmbStatus').combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 185,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.sort = "ITEM_ORDER";
			param.order = "ASC";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '518' "
					+ "AND ITEM_ID NOT IN ('518-2','518-7','518-8','518-11')";
		}
	});
	//资产类型
	$('#cmbAssetGenre').combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 70,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '569' ";
		}
	});
	//详细用途
	//edit by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
	//经费来源
	$('#cmbFundSource').combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 150,
		multiple : true,//add by wangxiani 2017年3月2日10:50:24 HRPASSETDEVJAVA-2176		资产信息维护可维护多个经费来源
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '515'";
		},
		onSelect:function(record){
            var rowsInfo= $("#dgFundSource").datagrid("getRows");
            if(rowsInfo.length==0&&$("#txtPrice").numberbox('getValue')!=''){
                $('#dgFundSource').datagrid('appendRow',{
                    FUND_SOURCE: record.id,
                    FUND_SOURCE_NAME: record.text,
                    FUND_PRICE:$("#txtPrice").numberbox('getValue')
                });
            }else {
                $('#dgFundSource').datagrid('appendRow', {
                    FUND_SOURCE: record.id,
                    FUND_SOURCE_NAME: record.text
                });
            }
			$('#tt').tabs('select', 1);
		},
		onUnselect:function(record){
			endEditing();//删除前校验编辑已结束
			var allData = $('#dgFundSource').datagrid('getData').rows;
			var rowIndex;
			if(allData.length == 1){
				$('#tt').tabs('select', 0);
			}
			for(var i =0;i<allData.length;i++){
				if(allData[i].FUND_SOURCE == record.id){
					rowIndex = i;
					break;
				}
			}
			$('#dgFundSource').datagrid('deleteRow',rowIndex);
		}
	});
	//国家分类
	$("#cmbgridCodeNo").combogrid({
		panelWidth : 500,
		panelHeight : 200,
		mode : 'remote',
		idField : 'CODE_NO',
		textField : 'CODE_NAME', 
		rownumbers : true,
		pagination : true,
		url : comboGridActionUrl + "CommComboGridCols", // (注意参数名)
		onBeforeLoad : function(param) {
			param.table = "ASSET_CODE";
			param.id = "CODE68";
			param.text = "CODE_NAME";
			param.sort = "CODE68";
			param.order = "ASC";
			param.inputCode = "CODE32";
			param.isShowInputCode = "true";
			param.isDistinct = "false";
			param.ajaxColName = "CODE_NAME";
			param.where = " AND VISIBLE_INDICATOR = 1 ";
		},
		columns : [ [ {
			field : 'CODE_NO',
			width : 80,
			title : '编号',
			hidden : true
		}, {
			field : 'CODE_NAME',
			title : '类别名称',
			width : 150,
			halign : 'center',
			align : 'left'
		}, {
			field : 'CODE68',
			title : '68码',
			width : 140,
			halign : 'center',
			align : 'left'
		}, {
			field : 'CODE32',
			title : '32码 ',
			width : 140,
			halign : 'center',
			align : 'left'
		}]],
		onSelect : function(rowIndex, rowData) {
			showCodeNo = 1;
			getCodeNo();
		},
		filter : function(q, row) {
			var opts = $(this).combogrid('options');
			return (row[opts.textField]
					.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
					.indexOf(q.toLowerCase()) != -1);
		}
	});
	//核算折旧方法
	$('#cmbDepreciationMethod').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 150,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			//edit begin zhaoweijuan 2015年1月27日17:31:17 HRPASSETDEVJAVA-1044
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '516'";
			//edit begin zhaoweijuan 2015年1月27日17:31:17 HRPASSETDEVJAVA-1044
		}
	});
	//管理折旧方法
	$('#cmbDepreciationMethod2').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 150,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			//edit begin zhaoweijuan 2015年1月27日17:31:17 HRPASSETDEVJAVA-1044
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '516'";
			//edit begin zhaoweijuan 2015年1月27日17:31:17 HRPASSETDEVJAVA-1044
		}
	});
	//edit begin 李文康 资产区域下拉框 2015年3月30日17:21:36 HRPASSETDEVJAVA-1188
	//资产区域
	$('#cmbAssetArea').combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 120,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '558'";
		}
	});
	//edit end 李文康 资产区域下拉框   2015年3月30日17:21:39 HRPASSETDEVJAVA-1188
	//edit begin zhaoweijuan 2015年4月2日19:02:27 HRPASSETDEVJAVA-1186
	$("#cmbDealEngineer").combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : "id",
		textField : "text",
		panelHeight : 115,
		onBeforeLoad : function(param){
			param.table = "V_ASSET_REPAIR_USER_M";
			param.id = "USER_ID";
			param.text = "USER_NAME";
			param.isShowIdAndText = true;// "登录名和用户名同时显示出来"
			param.where = " AND VISIBLE_INDICATOR='1' "; 
		},
		filter : function(q, row) {
			var opts = $(this).combobox("options");
			return (row[opts.textField]
					.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
					.indexOf(q.toLowerCase()) != -1);
		}
	});
	//edit end zhaoweijuan 2015年4月2日19:02:27 HRPASSETDEVJAVA-1186
	
	//edit begin by 李宇 生产厂商、代理商下拉选择框改为下拉列表  2015年12月21日10:11:04  HRPASSETDEVJAVA-1778
	$('#cmbManufacturer').combogrid({
		url : comboGridActionUrl + "CommComboGridCols", 
		panelWidth : 600,
		panelHeight : 180,
		mode : 'remote',
		idField : 'SUPPLIER_INFO_ID', 
		textField : 'SUPPLIER_NAME', 
		rownumbers : true,
		pagination : true,
		onBeforeLoad : function(param) {
			param.table = "ASSET_SUPPLIER_INFO";
			param.id = "SUPPLIER_INFO_ID";
			param.text = "SUPPLIER_NAME";
			param.sort = "SUPPLIER_INFO_ID";
			param.order = "asc";
			param.ajaxColName = "SUPPLIER_NAME";
			param.where = " AND SUPPLIER_TYPE = 'M' ";//M代表生产厂商
			param.inputCode = "INPUT_CODE";
		},
		//edit start by suihaochuan 2017年1月11日16:58:59
		//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
		onChange : function(rec) {
			var grid = $("#cmbManufacturer").combogrid("grid");
			var selectRow = grid.datagrid('getSelected');
			if (selectRow != null && selectRow != undefined && selectRow != "") {
				$('#txtManufacturerTel').val(selectRow['OFFICE_PHONE']);								
				var countrName=selectRow['COUNTR_NAME'];								
				if(countrName != null && countrName != undefined && countrName != "")
				{
					$('#cmbCountrName').combobox('setValue', countrName);
				}else{
					//edit begin by 田博   默认选中第一项 2018年3月19日14:12:58 HRPASSETDEVJAVA-2727
					var loadData = $('#cmbCountrName').combobox("getData");
					if (loadData != undefined && loadData != ""
							&& loadData != null) {
						var len = loadData.length;
						if (len >= 1) {
							var defaultData = loadData[0];
							$('#cmbCountrName').combobox('setValue',defaultData.id);
						}
					}
					//edit end by 田博  默认选中第一项 2018年3月19日10:15:02 HRPASSETDEVJAVA-2727	
				}						 
			} else {
				$('#txtManufacturerTel').val('');
				$('#cmbCountrName').combobox('setValue', '');
				 
			}
		},
		//edit end by suihaochuan
		columns : [ [ {
			field : 'SUPPLIER_CODE',
			title : '厂商编号',
			width : 80,
			align : 'center',
			sortable:true
		}, {
			field : 'SUPPLIER_NAME',
			title : '厂商名称',
			width : 120,
			align : 'left',
			halign : 'center',
			sortable:true
		}, {
			field : 'INPUT_CODE',
			title : '输入码',
			width : 70,
			align : 'left',
			halign : 'center'
		},{
			field : 'SHORT_TITLE',
			title : '厂商简称',
			width : 80,
			align : 'left',
			halign : 'center'
		},{
			field : 'ASSET_TYPE_NAME',
			title : setReplaceContrastData('资产大类'),
			width : 80,
			align : 'left',
			halign : 'center'
		}, {
			field : 'BANK',
			title : '开户银行',
			width : 120,
			align : 'left',
			halign : 'center'
		}, {
			field : 'BANK_NO',
			title : '开户银行账号',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'TAX_NO',
			title : '税号',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'COUNTRY_NO',
			title : '国别编号',
			width : 70,
			align : 'left',
			halign : 'center'
		}, {
			field : 'COUNTR_NAME',
			title : '国别名称',
			width : 80,
			align : 'left',
			halign : 'center'
		}, {
			field : 'SUPERIOR_CODE',
			title : '上报代码',
			width : 80,
			align : 'left',
			halign : 'center',
			sortable:true
		}, {
			field : 'FINANCE_CODE',
			title : '财务编号',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'REGIST_NO',
			title : '注册证',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'REGIST_PERIOD',
			title : '注册证有效期',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value != null && value != undefined && value != "") {
					return dateFormatterYMD(value);
				}
			},
			sortable:true
		}, {
			field : 'BUSINESS_LIENCE',
			title : '营业执照',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'BUSINESS_PERIOD',
			title : '营业执照有效期',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value != null && value != undefined && value != "") {
					return dateFormatterYMD(value);
				}
			},
			sortable:true
		}, {
			field : 'SALES_LIENCE',
			title : '许可证',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'SALES_PERIOD',
			title : '许可证有效期',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value != null && value != undefined && value != "") {
					return dateFormatterYMD(value);
				}
			},
			sortable:true
		}, {
			field : 'CERTIFY_INFO',
			title : '认证情况',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value,row,index){ return showOtherMessage(value,10);}
		}, {
			field : 'VALID_INDICATOR',
			title : '状态',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter:function(value,row,index){
				if(value == "1"){
					return "启用";
				}else{
					return "停用";
				}
			},
			sortable:true
		}, {
			field : 'LOCATION',
			title : '厂商地址',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value,row,index){ return showOtherMessage(value,10);}
		}, {
			field : 'POSTCODE',
			title : '邮政编码',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'OFFICE_PHONE',
			title : '厂商电话',
			width : 100,
			align : 'left',
			halign : 'center'
		}]]
	});
	
	$('#cmbAgent').combogrid({
		url : comboGridActionUrl + "CommComboGridCols", 
		panelWidth : 600,
		panelHeight : 180,
		mode : 'remote',
		idField : 'SUPPLIER_INFO_ID', 
		textField : 'SUPPLIER_NAME', 
		rownumbers : true,
		pagination : true,
		onBeforeLoad : function(param) {
			param.table = "ASSET_SUPPLIER_INFO";
			param.id = "SUPPLIER_INFO_ID";
			param.text = "SUPPLIER_NAME";
			param.sort = "SUPPLIER_INFO_ID";
			param.order = "asc";
			param.ajaxColName = "SUPPLIER_NAME";
			param.where = " AND SUPPLIER_TYPE = 'S' ";//S代表代理商
			param.inputCode = "INPUT_CODE";
		},
		//edit start by suihaochuan 2017年1月11日16:57:39
		//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
		onChange : function(rec) {
			var grid = $("#cmbAgent").combogrid("grid");
			var selectRow = grid.datagrid('getSelected');
			if (selectRow != null && selectRow != undefined&& selectRow != "") {
				$('#txtAgentTel').val(selectRow['OFFICE_PHONE']);
 
			} else {
				$('#txtAgentTel').val('');
 
			}
		},
		//edit end by suihaochuan
		columns : [ [ {
			field : 'SUPPLIER_CODE',
			title : '厂商编号',
			width : 80,
			align : 'center',
			sortable:true
		}, {
			field : 'SUPPLIER_NAME',
			title : '厂商名称',
			width : 120,
			align : 'left',
			halign : 'center',
			sortable:true
		}, {
			field : 'INPUT_CODE',
			title : '输入码',
			width : 70,
			align : 'left',
			halign : 'center'
		},{
			field : 'SHORT_TITLE',
			title : '厂商简称',
			width : 80,
			align : 'left',
			halign : 'center'
		},{
			field : 'ASSET_TYPE_NAME',
			title : setReplaceContrastData('资产大类'),
			width : 80,
			align : 'left',
			halign : 'center'
		}, {
			field : 'BANK',
			title : '开户银行',
			width : 120,
			align : 'left',
			halign : 'center'
		}, {
			field : 'BANK_NO',
			title : '开户银行账号',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'TAX_NO',
			title : '税号',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'COUNTRY_NO',
			title : '国别编号',
			width : 70,
			align : 'left',
			halign : 'center'
		}, {
			field : 'COUNTR_NAME',
			title : '国别名称',
			width : 80,
			align : 'left',
			halign : 'center'
		}, {
			field : 'SUPERIOR_CODE',
			title : '上报代码',
			width : 80,
			align : 'left',
			halign : 'center',
			sortable:true
		}, {
			field : 'FINANCE_CODE',
			title : '财务编号',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'REGIST_NO',
			title : '注册证',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'REGIST_PERIOD',
			title : '注册证有效期',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value != null && value != undefined && value != "") {
					return dateFormatterYMD(value);
				}
			},
			sortable:true
		}, {
			field : 'BUSINESS_LIENCE',
			title : '营业执照',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'BUSINESS_PERIOD',
			title : '营业执照有效期',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value != null && value != undefined && value != "") {
					return dateFormatterYMD(value);
				}
			},
			sortable:true
		}, {
			field : 'SALES_LIENCE',
			title : '许可证',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'SALES_PERIOD',
			title : '许可证有效期',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value != null && value != undefined && value != "") {
					return dateFormatterYMD(value);
				}
			},
			sortable:true
		}, {
			field : 'CERTIFY_INFO',
			title : '认证情况',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value,row,index){ return showOtherMessage(value,10);}
		}, {
			field : 'VALID_INDICATOR',
			title : '状态',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter:function(value,row,index){
				if(value == "1"){
					return "启用";
				}else{
					return "停用";
				}
			},
			sortable:true
		}, {
			field : 'LOCATION',
			title : '厂商地址',
			width : 100,
			align : 'left',
			halign : 'center',
			formatter : function(value,row,index){ return showOtherMessage(value,10);}
		}, {
			field : 'POSTCODE',
			title : '邮政编码',
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'OFFICE_PHONE',
			title : '厂商电话',
			width : 100,
			align : 'left',
			halign : 'center'
		}]]
	});	
	//edit end by 李宇 生产厂商、代理商下拉选择框改为下拉列表  2015年12月21日10:11:04  HRPASSETDEVJAVA-1778	
	$('#cmbIsEconomicBenefit').combobox({
		valueField : "id",
		textField : "text",
		panelHeight : 90,
		editable :false,
		value : '',
		data : [ {
			id : '',
			text : ''
		}, {
			id : 'Y',
			text : '有经济效益'
		},{
			id : 'N',
			text : '无经济效益'
		} ]
	});
	//edit by 李宇 附属设备入库方式下拉选择初始化 2016年6月21日11:02:35 
	$('#cmbImportType').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 150,
		valueField : 'id',
		textField : 'text',
		editable : false,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";
			param.where = " AND DICT_ID = '508' AND ITEM_ID != '508-3' ";
		}
	});
}

function queryTrustee(deptId){
	// edit begin by libin 2016年11月7日19:02:59 使用科室发生变化，获取该科室对应的默认保管人 HRPASSETDEVJAVA-2100
	$.ajax({
		type : "POST",
		async: false,
		url : actionComm + "doQueryDefaultTrustee",
		dataType : 'json',
		data : {
			"DEPT_ID" : deptId
		},
		success : function(data) {
			if(data.DataTable.row.length > 0){ // 一个科室只有一个默认保管人
				trustee = data.DataTable.row[0].col[0].value ;
				if(!isLoadLessUser)
				{
					$('#cmbTrustee').combobox("setValue",trustee);
				}
			}else{
				trustee = "" ;
			}				
		},
		error : function(data) {
			ajaxError(data, "error");
		}
	});
	// edit end by libin 2016年11月7日19:02:59 使用科室发生变化，获取该科室对应的默认保管人 HRPASSETDEVJAVA-2100
}


//EDIT ADD BEGIN LIDU 2016年3月12日14:28:40 
//初始化入库方式HRPASSETDEVJAVA-1851	
function initImpTypeCombobox(){	
	$("#cmbImpType").combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 100,
		editable:false,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_ID";
			param.text = "ITEM_NAME";			
			param.sort = "ITEM_ORDER";
			param.order = "ASC";			
			param.where = " AND DICT_ID = '508' ";
		}
	});
	$('#cmbCountrName').combobox({
		url : comboBoxActionUrl + "getComboBox",
		panelHeight : 150,
		valueField : 'id',
		textField : 'text',
		editable:true,
		onBeforeLoad : function(param) {
			param.table = "SYS_CODE_ITEM";
			param.id = "ITEM_NAME";
			param.text = "ITEM_NAME";
			param.order = "asc";
			param.sort = "ITEM_ORDER";
			param.where = " AND VALIDATE_FLAG = 1 AND DICT_ID = '570'";				
		},
		onLoadSuccess : function() {
			var loadData = $(this).combobox("getData");
			if (loadData != undefined && loadData != ""
					&& loadData != null) {
				var len = loadData.length;
				if (len >= 1) {
					var defaultData = loadData[0];
					$(this).combobox('setValue',defaultData.id);
				}
			}
		}
	});  
}
//EDIT ADD END LIDU 2016年3月12日14:28:57

/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化使用房间
 * 作者：邓文斌
 * 时间：2015年1月22日14:42:30
 * @param dept_id
 * returnType：void
 * </pre>
 */
function initAedCode(dept_id) {
	var str_where = " AND AED_CODE IS NOT NULL ";
	if (dept_id != null && dept_id != undefined && dept_id != "") {
		str_where += " AND TO_CHAR(DEPT_ID) = '" + dept_id + "'";
	}
	$('#cmbAedCode').combobox({
		url : comboBoxActionUrl + "getComboBox",
		valueField : 'id',
		textField : 'text',
		panelHeight : 200,
		onBeforeLoad : function(param) {
			param.table = "ASSET_EXCITER_DEPT";
			param.id = "AED_ID";
			param.text = "NODE_NAME";
			param.where = str_where;
		},
		filter : function(q, row) {
			var opts = $(this).combobox('options');
			return (row[opts.textField]
					.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
					.indexOf(q.toLowerCase()) != -1);
		},
		onSelect : function(record) {
			initBuildAndFloor(record.id);
		}
	});
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化大类
 * 作者：邓文斌
 * 时间：2015年1月22日14:42:30
 * returnType：void
 * </pre>
 */
function initAssetType(){
	var asset_where = " AND VALIDATE_FLAG = 1 ";
	asset_where += " AND ASSET_TYPE_ID IN (SELECT ASSET_TYPE_ID FROM ASSET_SYS_USER_AT_PERM WHERE USER_ID='"
			+ loginInfo.USER_ID + "')";
	$('#cmbAssetType').combobox({
		//async : false,
		url : comboBoxActionUrl + "getComboBox",
		panelWidth : 220,
		panelHeight :200,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "ASSET_TYPE_DICT";
			param.id = "ASSET_TYPE_ID";
			param.text = "ASSET_TYPE_NAME";
			param.where = asset_where;
			param.inputCode = "INPUT_CODE";
		},
		filter : function(q, row) {
			var opts = $(this).combobox('options');
			return (row[opts.textField]
					.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
					.indexOf(q.toLowerCase()) != -1);
		},
		onChange : function(newValue, oldValue) {
//			initSubType();
		}
	});
	//initCombogrid("", "");
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化定位房间
 * 作者：邓文斌
 * 时间：2015年1月22日14:42:30
 * @param dept_id
 * returnType：void
 * </pre>
 */
function initLocationAed(dept_id) {
	var str_where = " AND AED_CODE IS NOT NULL ";
	if (dept_id != null && dept_id != undefined && dept_id != "") {
		str_where += " AND DEPT_ID = '" + dept_id + "'";
	}
	$('#cmbLocationAed')
			.combobox(
					{
						url : comboBoxActionUrl + "getComboBox",
						valueField : 'id',
						textField : 'text',
						panelHeight : 200,
						onBeforeLoad : function(param) {
							param.table = "ASSET_EXCITER_DEPT";
							param.id = "AED_ID";
							param.text = "NODE_NAME";
							param.where = str_where;
						},
						filter : function(q, row) {
							var opts = $(this).combobox('options');
							return (row[opts.textField]
									.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
									.indexOf(q.toLowerCase()) != -1);
						},
					});
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：初始化楼层
 * 作者：邓文斌
 * 时间：2015年1月22日14:42:30
 * @param dept_id
 * returnType：void
 * </pre>
 */
function initBuildAndFloor(aedId) {
	var obj = {
		"aedId" : aedId
	};
	$.ajax({
		type : "POST",
		url : action + "doGetBuildAndFloorByAedCode",
		data : obj,
		dataType : 'json',
		success : function(json) {
			if (json.success) {
				$("#txtBuilding").val(json.message.split("|")[0]);
				$("#txtFloor").val(json.message.split("|")[1]);
			} else {
			}
		},
		error : function(data) {
			ajaxError(data, '温馨提示');
		}
	});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:初始化子类
* 作者:邓文斌
* 日期:2015年1月22日 下午2:46:38
* @param asset_type
* </pre>
 */
function initSubType() {
	//Edit begin by PanWeidong 2016-09-30 11:22
	//HRPMTRDEVJAVA-1375 资产信息维护界面直接选择资产名称，资产大类，子类自动添加到界面上（目前必须先选择大类，子类，才能选择资产名称，影响效率）
	var str_where = " AND VALIDATE_FLAG = 1 ";
	//Edit end by PanWeidong 2016-09-30 11:22
	$('#cmbAssetSubType').combobox({
		//async : false,
		url : comboBoxActionUrl + "getComboBox",
		panelWidth : 220,
		panelHeight : 200,
		valueField : 'id',
		textField : 'text',
		onBeforeLoad : function(param) {
			param.table = "ASSET_SUB_TYPE_DICT";
			param.id = "ASSET_SUB_TYPE_ID";
			param.text = "ASSET_SUB_TYPE_NAME";
			param.where = str_where;
			param.inputCode = "INPUT_CODE";
		},
		filter : function(q, row) {
			var opts = $(this).combobox('options');
			return (row[opts.textField]
					.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
					.indexOf(q.toLowerCase()) != -1);
		},
		onChange : function(newValue, oldValue) {
//			initCombogrid(asset_type, newValue);
//			var depreciationRate = getSubTypeDepreciationRate(newValue);
//			//Edit begin by PanWeidong 2016-07-15 15:22
//			//HRPDRTESTJAVA-4330  基本信息维护新增，保存报错。
//			if (depreciationRate == "null" || depreciationRate == null) {
//				$("#txtSalvageRatio").numberbox("setValue", "0.00");
//			} else {
//				var salvageRatio = 1-Number(depreciationRate);
//				$("#txtSalvageRatio").numberbox("setValue", salvageRatio);
//			}
//			//Edit begin by PanWeidong 2016-07-15 15:22
		}
	});
	//initCombogrid(asset_type, "");
}

//edit end 齐晓冬 2015年12月9日14:19:05 修改combobox高度 HRPDRTESTJAVA-2763
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:初始化名称
* 作者:邓文斌
* 日期:2015年1月22日 下午2:46:38
* @param at ast
* </pre>
 */
function initCombogrid() {
	//Edit begin by PanWeidong 2016-09-30 11:22
	//HRPMTRDEVJAVA-1375 资产信息维护界面直接选择资产名称，资产大类，子类自动添加到界面上（目前必须先选择大类，子类，才能选择资产名称，影响效率）
	var whereStr = " AND VALIDATE_FLAG = 1 ";
	if(asset_dict_id!=null && asset_dict_id!="" && asset_dict_id!=undefined)
	{
		whereStr +=" OR ASSET_DICT_ID='"+ asset_dict_id + "'";
	}
	//Edit by tianbo 2017-08-21 11:22
	whereStr += " AND ASSET_SUB_TYPE IN (SELECT ASSET_TYPE_ID FROM ASSET_SYS_USER_AT_PERM WHERE USER_ID='"
			+ loginInfo.USER_ID + "')";
	//Edit end by PanWeidong 2016-09-30 11:22
	$('#cmbAssetName').combogrid({
		panelWidth : 600,
		panelHeight : 300,
		mode : 'remote',
		idField : 'ASSET_DICT_ID', 
		textField : 'ASSET_NAME', 
		rownumbers : true,
		pagination : true,
		url : comboGridActionUrl + "CommComboGridCols", 
		onBeforeLoad : function(param) {

			param.table = 
				" (SELECT DISTINCT VHAD.*, ATV.ITEM_ID\n" +
				"    FROM V_HRP_ASSET_DICT VHAD\n" + 
				"    LEFT JOIN ASSET_TYPE_VS ATV\n" + 
				"      ON ATV.ASSET_TYPE_ID = VHAD.ASSET_SUB_TYPE)";

			param.id = "ASSET_DICT_ID";
			param.text = "ASSET_NAME";
			param.sort = "ASSET_TYPE";
			param.order = "asc";
			param.inputCode = "INPUT_CODE";
			param.ajaxColName = "ASSET_NAME";
			param.where = whereStr;
		},
		columns : [ [ {
				field : 'ASSET_DICT_ID',
				title : setReplaceContrastData('资产ID'),
				hidden : true
			},
			{
				field : 'ASSET_TYPE_NAME',
				title : setReplaceContrastData('资产大类'),
				width : 100,
				halign : 'center',
				align : 'left'
			},
			{
				field : 'ASSET_SUB_TYPE_NAME',
				title : setReplaceContrastData('资产子类'),
				width : 100,
				halign : 'center',
				align : 'left'
			}, {
		        field: 'ASSET_GENRE',
		        hidden:true
		    }, {
		        field: 'ASSET_GENRE_NAME',
		        title: setReplaceContrastData('资产类型'),
		        align: 'left',
		        halign: 'center',
		        width: 80,
		    }, {
				field : 'ASSET_NAME',
				title : setReplaceContrastData('资产名称'),
				width : 200,
				halign : 'center',
				align : 'left'
			}, {
				field : 'SPEC',
				title : '规格',
				width : 60,
				halign : 'center',
				align : 'left'
			}, {
				field : 'UNITS',
				title : '单位',
				width : 60,
				halign : 'center',
				align : 'left',
				hidden : true
			}, {
				field : 'UNITS_NAME',
				title : '单位名称',
				width : 60,
				halign : 'center',
				align : 'left'
			}, {
				field : 'TYPE',
				title : '型号',
				width : 60,
				halign : 'center',
				align : 'left'
			}, {
				field : 'PRICE',
				title : '价格',
				halign : 'center',
				align : 'right',
				width : 80,
				halign : 'center',
				align : 'right'
			}, {
				field : 'INPUT_CODE',
				title : '输入码 ',
				width : 80,
				halign : 'center',
				align : 'left'
			}, {
				field : 'DEPRECIATION_METHOD',
				title : '折旧方法 ',
				width : 120,
				halign : 'center',
				align : 'left'
				//edit begin zhaoweijuan 2015年1月27日17:10:35 HRPASSETDEVJAVA-1044
			}, {
				field : 'USE_YEARS_LIMITED',
				title : '使用年限 ',
				width : 60,
				halign : 'center',
				align : 'right'
				//edit end zhaoweijuan 2015年1月27日17:10:35 HRPASSETDEVJAVA-1044
			}, {
				field : 'DEPRECIATION_METHOD_ID',
				title : '折旧方法ID ',
				hidden : true
			}, {
				field : 'ASSET_TYPE_CODE',
				title : '大类CODE',
				hidden : true
			}, {
				field : 'REPAIR_FLAG',
				hidden : true
			} ] ],
		onSelect : function(rec) {
			if(changeFlag > 2){
				var grid = $("#cmbAssetName").combogrid("grid");
				var selectRow = grid.datagrid('getSelected');
				if (selectRow != null && selectRow != undefined && selectRow != "") {
					assetTypeDictId = selectRow["ITEM_ID"];
					vu.sdsEnableFlag && (vu.assetTypeDictValue.assetTypeDict = assetTypeDictId);
					$('#txtSpec').val(selectRow["SPEC"]);
					$('#txtType').val(selectRow["TYPE"]);
					$('#txtPrice').numberbox('setValue',
							selectRow["PRICE"]);
					$('#hd_asset_type_code').val(
							selectRow["ASSET_TYPE_CODE"]);
					$('#cmbUnits').combobox('setValue',
							selectRow["UNITS"]);
					var depreciation_method_id = selectRow["DEPRECIATION_METHOD_ID"];
					$('#cmbDepreciationMethod').combobox('setValue',depreciation_method_id);
					$('#cmbDepreciationMethod2').combobox('setValue',depreciation_method_id);
					//edit begin zhaoweijuan 2015年1月27日17:10:35 HRPASSETDEVJAVA-1044
					$('#txtUseYears').numberbox('setValue',selectRow["USE_YEARS_LIMITED"]);
					//edit end zhaoweijuan 2015年1月27日17:10:35 HRPASSETDEVJAVA-1044
					$('#cmbRepairFlag').combobox('setValue',selectRow["REPAIR_FLAG"]);
					//Edit begin by PanWeidong 2016-09-30 11:22
					//HRPMTRDEVJAVA-1375 资产信息维护界面直接选择资产名称，资产大类，子类自动添加到界面上（目前必须先选择大类，子类，才能选择资产名称，影响效率）
					$('#cmbAssetType').combobox('setValue',selectRow.ASSET_TYPE);
					$('#cmbAssetSubType').combobox('setValue',selectRow.ASSET_SUB_TYPE);
					$('#cmbAssetGenre').combobox('setValue',selectRow.ASSET_GENRE);
					var depreciationRate = getSubTypeDepreciationRate(selectRow.ASSET_SUB_TYPE);
					$('#cmbgridCodeNo').combogrid('setValue',selectRow.CODE_NO);
					if (depreciationRate == "null" || depreciationRate == null) {
						$("#txtSalvageRatio").numberbox("setValue", "0.00");
					} else {
						var salvageRatio = 1-Number(depreciationRate);
						$("#txtSalvageRatio").numberbox("setValue", salvageRatio);
					}
					//Edit end by PanWeidong 2016-09-30 11:22
					
				}
			}
			changeFlag += 1;
		}
	});
	
 
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:新增界面
* 作者:邓文斌
* 日期:2015年1月22日 下午2:49:10
* </pre>
 */
function initAdd() {
	showCodeNo = 1;
	initAedCode("-999");
	initLocationAed("-999");
	$("#btnSelectPic").linkbutton('disable');
	enEditBtn();
	$("#addform").form('clear');
	var getTabs = $('#tab_center').tabs('tabs');
	$('#tab_center').tabs('close', 3);
	$('#tab_center').tabs('close', 2);
	$('#tab_center').tabs('close', 1);
	$('#hd_photo_path').val('');
	$("#hd_SM_ID").val("");
	$("#txtPrice").numberbox("setValue", '0.00');
	$("#cmbUsage").combobox('setValue', '522-2');
	//edit begin by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
	$("#txtDetailedUsage").val('');
	//edit end by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
	setDate("#txtBuyDate");
	//edit begin by 李宇 2016年1月19日09:27:32 去掉启用时间的初始赋值 HRPASSETDEVJAVA-1813
//	setDate("#timeStartUsingDate");
	//edit end by 李宇 2016年1月19日09:27:32 去掉启用时间的初始赋值 HRPASSETDEVJAVA-1813
	$("#cmbStatus").combobox('setValue', '518-1');
	$("#cmbStatus").combobox('enable');
	$("#txtSalvageRatio").numberbox("setValue", '0.00');
	var loginDeptId = loginInfo.DEPT_ID;
	if (loginDeptId == -100) {
		$("#cmbDept").combobox('setValue', "");
		$("#cmbDept").combobox('enable');
	} else {
		$("#cmbDept").combobox('setValue', loginDeptId);
		$("#cmbDept").combobox('disable');
	}
//	if (loginDeptId == -100) {
//		$("#cmbUseDept").combobox('setValue', "");
//	} else {
//		$("#cmbUseDept").combobox('setValue', loginDeptId);
//	}
	//edit begin by 田博 2018年02月28日16:26:33 HRPASSETDEVJAVA-2695
	$("input[name='rdIsImportAsset']:radio[value='1']").attr('checked','true');//EDIT BEGIN LIDU 2016年10月27日09:39:49  HRPCOMMERCIALBUGJAVA-2297 新增时，入库设备为否
	//edit end by 田博 2018年02月28日17:26:33 HRPASSETDEVJAVA-2695
	$('#imgPath_window').attr("src", "");
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述: 设置日期为当前日期
* 作者:邓文斌
* 日期:2015年1月22日 下午2:50:05
* @param date_id
* </pre>
 */
function setDate(date_id) {
	var nowDate = new Date();
	$(date_id).datetimepicker({
		value : dateFormatterYMD(nowDate)
	});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:修改界面
* 作者:邓文斌
* 日期:2015年1月22日 下午2:49:10
* </pre>
 */
function initEdit() {
	showCodeNo = 0;
	$("#btnSelectPic").linkbutton('enable');
	$("#addform").form('clear');
	//修改窗体打开时，关闭掉上次的选项卡
	$('#tab_center').tabs('close', 3);
	$('#tab_center').tabs('close', 2);
	$('#tab_center').tabs('close', 1);
	//第二个选项卡“资质信息”
	var content = '<iframe id="asset_certificate" scrolling="auto" frameborder="0"  src="'
		+ '" style="width:100%;height:100%;"></iframe>';
	$('#tab_center').tabs('add', {
		title : '资质信息',
		content : content,
		closable : false
	});
	//第三个选项卡“技术资料”
	content = '<iframe id="asset_elec" scrolling="auto" frameborder="0"  src="'
		+ '" style="width:100%;height:100%;"></iframe>';
	$('#tab_center').tabs('add', {
		title : '技术资料',
		content : content,
		closable : false
	});
	//第四个选项卡“设备档案”
	content = '<iframe id="asset_elec_ed" scrolling="auto" frameborder="0"  src="'
		+ '" style="width:100%;height:100%;"></iframe>';
	$('#tab_center').tabs('add', {
		title : '设备档案',
		content : content,
		closable : false
	});
	//选择第一个选项卡
	$('#tab_center').tabs('select',0);
}
//初始化其它选项卡
//edit by zhaoweijuan 2015年2月4日16:43:49 HRPDRTESTJAVA-1517
function timeOutFun(){
	//第二个选项卡“资质信息”
	var url = "../../AssetComm/AssetCertificationMaintain/AssetCertificationMaintainView.htm?ASSET_ID="
			+ asset_id + "&PAGE_LEVEL=" + (page_level + 1);
	$("#asset_certificate").attr("src", url);
	// 第三个选项卡“技术资料”
	var invoice_type = "A";
	var pageType = "AssetBasicInfoAddView";
	var is_edit = true;
	//edit begin zhaoweijuan 2015年4月21日11:08:04 HRPASSETDEVJAVA-1250
	url = "../../AssetComm/AssetEquipDocManage/AssetEquipDocManageView.htm?INVOICETYPE="
			+ invoice_type
			+ "&PAGETYPE="
			+ pageType
			+ "&ASSET_ID="
			+ asset_id
			+ "&IS_EDIT=" + is_edit + "&PAGE_LEVEL=" + (page_level + 1);
	//edit end zhaoweijuan 2015年4月21日11:08:04 HRPASSETDEVJAVA-1250
	$("#asset_elec").attr("src", url);
	//第四个选项卡“设备档案”
	var invoice_type_ed = "AED";
	var pageType_ed = "AssetBasicInfoAddView";
	var is_edit_ed = true;
	url = "../../AssetComm/AssetEquipDocManage/AssetEquipDocManageView.htm?INVOICETYPE="
			+ invoice_type_ed
			+ "&PAGETYPE="
			+ pageType_ed
			+ "&ASSET_ID="
			+ asset_id
			+ "&IS_EDIT="
			+ is_edit_ed
			+ "&PAGE_LEVEL="
			+ (page_level + 1);
	$("#asset_elec_ed").attr("src", url);
	//初始化附件列表
	initPicList();
}

/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:根据附件信息查询
* 作者:邓文斌
* 日期:2015年1月22日 下午3:11:24
* </pre>
 */
function initPicList() {
	$("#dgPicList").datagrid({
		columns : creatPicListColumns(),
		fit : true,
		toolbar : '#dgPicTool',
		url : action + "doQueryPicList",
		queryParams : {
			"asset_id" : "",
			"attachment_format" : ""
		},
		rownumbers : true,
		pagination : true,
		singleSelect : true,
		onLoadError : onLoadError, 
		onLoadSuccess : onLoadSuccess
	});
}
function creatPicListColumns() {
	var columns = [ [
			{
				field : 'ATTACHMENT_ID',
				title : '附件ID',
				hidden : true
			},
			{
				field : 'ATTACH_ID',
				title : '公共附件ID',
				hidden : true
			},{
				field : 'ATTACH_CONFIG_ID',
				title : '配置ID',
				hidden : true
			},{
				field : 'ASSET_ID',
				title : setReplaceContrastData('资产ID'),
				hidden : true
			},
			{
				field : 'ASSET_NAME',
				title : setReplaceContrastData('资产名称'),
				width : 100,
				halign : 'center',
				align : 'left',
				hidden : true
			},
			{
				field : 'ASSET_NO',
				title : setReplaceContrastData('资产编码'),
				width : 100,
				align : 'center',
				hidden : true
			},
			{
				field : 'ATTACHMENT_URL',
				title : '操作',
				width : 100,
				align : 'center',
				formatter : function(value, row, index) {
					if (value != null && value != undefined && value != "") {
						return "<a href='#' onclick='doDisplayPic(\"" + value
								+ "\",\"" + row.ASSET_ID + "\",\"" + row.ATTACH_ID + "\",\"" + row.ATTACH_CONFIG_ID + "\")'>查看图片</a>";
					} else {
						return "";
					}
				}
			//edit begin zhaoweijuan 2015年3月6日09:59:31 HRPASSETDEVJAVA-1126
			}, {
				field : 'ATTACHMENT_NAME',
				title : '文件名称',
				width : 120,
				halign : 'center',
				align : 'left'
			//edit end zhaoweijuan 2015年3月6日09:59:31 HRPASSETDEVJAVA-1126
			}, {
				field : 'ATTACHMENT_DESCRIPTION',
				title : '文件说明',
				width : 200,
				halign : 'center',
				align : 'left'
			}, {
				field : 'CREATE_NAME',
				title : '创建人',
				width : 100,
				halign : 'center',
				align : 'center'
			}, {
				field : 'CREATE_DATE',
				title : '创建日期',
				width : 100,
				align : 'center',
				formatter : function(value, row, index) {
					if (value != null && value != undefined && value != "") {
						return dateFormatterYMD(value);
					}
				}
			} ] ];
	return columns;
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1043
 * 描述：依据使用部门筛选保管人
 * 作者：邓文斌
 * 时间：2015年1月22日14:53:12
 * returnType：void
 * </pre>
 */
function initTustee(user_dept_id,user_id) {
	//edit by tianbo 2017年11月06日10:00:20 HRPASSETDEVJAVA-2492
	var where = "";
	if(isLoadLessUser){
		if(!user_dept_id){
			return;
		}
		 where=" AND DEPT_CODE = (SELECT VADI.DEPT_CODE FROM V_ASSET_DEPT_INFO VADI WHERE VADI.SERIAL_NO="+ user_dept_id +") ";
	 }
	$('#cmbTrustee')
			.combobox(
					{
						url : comboBoxActionUrl + "getComboBox",
						panelWidth : 180,
						panelHeight : 200,
						valueField : 'id',
						textField : 'text',
						onBeforeLoad : function(param) {
							param.table = "SYS_USER_EXT";
							param.id = "USER_ID";
							param.text = "USER_NAME";
							param.isShowIdAndText = true;
							//edit begin zhaoweijuan 2015年3月17日17:53:34 HRPASSETDEVJAVA-1157
							param.where = " AND VALIDATE_FLAG = 1 " + where + "";
							//edit end zhaoweijuan 2015年3月17日17:53:34 HRPASSETDEVJAVA-1157
						},
						filter : function(q, row) {
							var opts = $(this).combobox('options');
							return (row[opts.textField]
									.indexOf(q.toUpperCase()) != -1 || row[opts.textField]
									.indexOf(q.toLowerCase()) != -1);
						},
						// edit begin by libin 2016年11月8日9:52:12 加载完成后赋默认值 HRPASSETDEVJAVA-2100
						onLoadSuccess: function () {
//							if(trustee){// 修改时tempTrustee才会不为空
								$(this).combobox("setValue",trustee);
//								tempTrustee = "" ;
//							}else{
//								$(this).combobox("setValue",user_id);
//							}
						}// edit end by libin 2016年11月8日9:52:12 加载完成后赋默认值 HRPASSETDEVJAVA-2100
					});
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1819
 * 描述：根据是否已产生折旧记录，确定启用日期是否可编辑
 * 作者：李宇
 * 时间：2016年2月1日上午10:51:17
 * returnType：void
 * </pre>
 */
function IsEditStartUsingDate(){
	if(!asset_id){
		return;
	}
	$.messager.progress({
		text : "正在初始化启用日期，请稍后……"
	});
	$.ajax({
		type : "POST",
		url : action + "getDepreciationInfoNum",
		dataType : 'json',
		data : {
			"assetId" : asset_id
		},
		success : function(json) {
			$.messager.progress('close');
			if (json>0) {//如果已产生折旧信息
				$("#timeStartUsingDate").attr('disabled','disabled');
			} else {
				$("#timeStartUsingDate").attr('disabled',false);
			}
		},
		error : function(data) {
			ajaxError(data, '温馨提示');
		}
	});        		        	
}
function enEditBtn() {
	//edit begin by 李宇 使用状态受修改权限控制 2016年6月15日11:20:22 
	$("#cmbStatus").combobox('enable');
	//edit end by 李宇 使用状态受修改权限控制 2016年6月15日11:20:22 
//	$("#cmbAssetSubType").combobox('enable');
	$("#cmbAssetName").combogrid('enable');
	//edit begin zhaoweijuan 2015年4月17日19:02:15 HRPASSETDEVJAVA-1238
	$("#txtSpec").attr('disabled', false);
	$("#txtType").attr('disabled', false);
	//edit end zhaoweijuan 2015年4月17日19:02:15 HRPASSETDEVJAVA-1238
	$("#txtPrice").numberbox('enable');
	$("#cmbQualityGrade").combobox('enable');
	$("#cmbCategory").combobox('enable');
	$("#txtBuyDate").attr('disabled', false);
	$("#cmbDept").combobox('enable');
	$("#timeProductDate").attr('disabled', false);
	//edit begin by 李宇 2016年2月1日10:42:56 如果已经产生折旧信息，则不能修改启用日期 HRPASSETDEVJAVA-1819
	if(isEditAssetInfo){
		IsEditStartUsingDate();
	}else{
		$("#timeStartUsingDate").attr('disabled',false);
	}
	//edit end by 李宇 2016年2月1日10:42:56 如果已经产生折旧信息，则不能修改启用日期 HRPASSETDEVJAVA-1819
	$("#txtSalvageRatio").numberbox('enable');
	$("#txtRemainingTotal").numberbox('enable');
	$("#timeDepreciationDate").attr('disabled', false);
	$("#cmbDepreciationMethod2").combobox('enable');
	$("#txtDepreciationMonths2").numberbox('enable');
	$("#txtRemainingTotal2").numberbox('enable');
	$("#timeDepreciationDate2").attr('disabled', false);
	$("input[name='rdIsImportAsset']").attr('disabled',false);
	//edit bgein by 李宇 没有修改权限的用户进入后，限制更多字段不可修改 2016年5月6日14:27:19 HRPASSETDEVJAVA-1949
	$("#txtAssetNo").attr('disabled',false);
	$("#cmbUseDept").combobox('enable');
	$("#txtGuaranteeDate").attr('disabled', false);
	$("#txtSeqNo").attr('disabled', false);
	$("#cmbAgent").combobox('enable');
	$("#cmbManufacturer").combobox('enable');
	$("#cmbCountrName").combobox('enable');
	//edit by 李宇 2016年5月31日10:25:20 资产状态的修改不受权限控制
	//$("#cmbStatus").combobox('enable');
	$("#txtAssetBrand").attr('disabled', false);
	$("#txtArchiveLocation").attr('disabled', false);
	$("#cmbImpType").combobox('enable');
	$("#txtAdditionNo1").attr('disabled',false);
	$("#txtCode").attr('disabled',false);
	$("#cmbgridCodeNo").combobox('enable');
	$("#txtBuyBy").attr('disabled',false);
	$("#cmbUsage").combobox('enable');
	$("#timeCertificateDueDate").attr('disabled',false);
	$("#txtAdditionNo2").attr('disabled',false);
	$("#cmbQualityGrade").combobox('enable');
	$("#txtAccepter").attr('disabled',false);
	$("#timeAcceptDate").attr('disabled',false);
	$("#cmbCategory").combobox('enable');
	$("#txtRecipientsUser").attr('disabled',false);
	$("#timeRecipientsDate").attr('disabled',false);
	$("#txtRecipientsNo").attr('disabled',false);
	$("#cmbDepreciationMethod").combobox('enable');
	$("#txtDepreciationMonths").numberbox('enable');
	$("#txtInvoiceNo").attr('disabled',false);
	$("#txtInvoiceCodeDetail").attr('disabled',false);
	$("#cmbFundSource").combobox('enable');
	$("#txtFundAmount1").numberbox('enable');
	$("#txtFundAmount2").numberbox('enable');
	$("#cmbIsEconomicBenefit").combobox('enable');
	$("#btn_add_detail").attr('disabled','disabled');
	$("#btn_edit_detail").show();
	$("#btn_delete_detail").show();
	//edit end by 李宇 没有修改权限的用户进入后，限制更多字段不可修改 2016年5月6日14:27:19 HRPASSETDEVJAVA-1949
}
function disEditBtn() {
	//edit begin by 李宇 使用状态受修改权限控制 2016年6月15日11:20:22 
	$("#cmbStatus").combobox('disable');
	//edit end by 李宇 使用状态受修改权限控制 2016年6月15日11:20:22 
//	$("#cmbAssetSubType").combobox('disable');
	$("#cmbAssetName").combogrid('disable');
	//edit begin zhaoweijuan 2015年4月17日19:02:15 HRPASSETDEVJAVA-1238
	$("#txtSpec").attr('disabled', 'disabled');
	$("#txtType").attr('disabled', 'disabled');
	//edit end zhaoweijuan 2015年4月17日19:02:15 HRPASSETDEVJAVA-1238
	$("#txtPrice").numberbox('disable');
//edit begin dengwenbin 2015年10月8日 14:31:04 核准后质控等级、管理分类可以修改  HRPASSETDEVJAVA-1650
//	$("#cmbQualityGrade").combobox('disable');
//	$("#cmbCategory").combobox('disable');
	$("#txtBuyDate").attr('disabled', 'disabled');
	$("#cmbDept").combobox('disable');
	$("#timeProductDate").attr('disabled', 'disabled');
	$("#timeStartUsingDate").attr('disabled', 'disabled');
	$("#txtSalvageRatio").numberbox('disable');
	$("#txtRemainingTotal").numberbox('disable');
	$("#timeDepreciationDate").attr('disabled', 'disabled');
	$("#cmbDepreciationMethod2").combobox('disable');
	$("#txtDepreciationMonths2").numberbox('disable');
	$("#txtRemainingTotal2").numberbox('disable');
	$("#timeDepreciationDate2").attr('disabled', 'disabled');
	$("input[name='rdIsImportAsset']").attr('disabled',true);
	
	//edit bgein by 李宇 没有修改权限的用户进入后，限制更多字段不可修改 2016年5月6日14:27:19 HRPASSETDEVJAVA-1949
	$("#txtAssetNo").attr('disabled', 'disabled');
	$("#cmbUseDept").combobox('disable');
	$("#txtGuaranteeDate").attr('disabled', 'disabled');
	$("#txtSeqNo").attr('disabled', 'disabled');
	$("#cmbAgent").combobox('disable');
	$("#cmbManufacturer").combobox('disable');
	$("#cmbCountrName").combobox('disable');
	//edit by 李宇 2016年5月31日10:25:20 资产状态的修改不受权限控制
	//$("#cmbStatus").combobox('disable');
	$("#txtAssetBrand").attr('disabled','disabled');
	$("#txtArchiveLocation").attr('disabled','disabled');
	$("#cmbImpType").combobox('disable');
	$("#txtAdditionNo1").attr('disabled','disabled');
	$("#txtCode").attr('disabled','disabled');
	$("#cmbgridCodeNo").combobox('disable');
	$("#txtBuyBy").attr('disabled','disabled');
	$("#cmbUsage").combobox('disable');
	$("#timeCertificateDueDate").attr('disabled','disabled');
	$("#txtAdditionNo2").attr('disabled','disabled');
	$("#cmbQualityGrade").combobox('disable');
	$("#txtAccepter").attr('disabled','disabled');
	$("#timeAcceptDate").attr('disabled','disabled');
	$("#cmbCategory").combobox('disable');
	$("#txtRecipientsUser").attr('disabled','disabled');
	$("#timeRecipientsDate").attr('disabled','disabled');
	$("#txtRecipientsNo").attr('disabled','disabled');
	$("#cmbDepreciationMethod").combobox('disable');
	$("#txtDepreciationMonths").numberbox('disable');
	$("#txtInvoiceNo").attr('disabled','disabled');
	$("#txtInvoiceCodeDetail").attr('disabled','disabled');
	$("#cmbFundSource").combobox('disable');
	$("#txtFundAmount1").numberbox('disable');
	$("#txtFundAmount2").numberbox('disable');
	$("#cmbIsEconomicBenefit").combobox('disable');
	$("#btn_edit_detail").hide();
	$("#btn_delete_detail").hide();
	//edit end by 李宇 没有修改权限的用户进入后，限制更多字段不可修改 2016年5月6日14:27:19 HRPASSETDEVJAVA-1949
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:打开上传图片
* 作者:邓文斌
* 日期:2015年1月22日 下午2:53:55
* </pre>
 */
function doOpenUploadWindow() {
	var asset_type = $("#cmbAssetType").combobox('getValue');
	var asset_sub_type = $("#cmbAssetSubType").combobox('getValue');
	var asset_dict_id = $("#cmbAssetName").combogrid('getValue');
	if (asset_type == null || asset_type == undefined || asset_type == "") {
		$.messager.alert('温馨提示', setReplaceContrastData("请输入资产大类，")
				+ setReplaceContrastData("资产大类不能为空！"), 'info');
		return;
	}
	if (asset_sub_type == null || asset_sub_type == undefined
			|| asset_sub_type == "") {
		$.messager.alert('温馨提示', setReplaceContrastData("请选择资产子类，")
				+ setReplaceContrastData("资产子类不能为空！"), 'info');
		return;
	}
	if (asset_dict_id == null || asset_dict_id == undefined
			|| asset_dict_id == "") {
		$.messager.alert('温馨提示', setReplaceContrastData("请选择资产项目名称，")
				+ setReplaceContrastData("资产项目名称不能为空！"), 'info');
		return;
	}
	$("#window_upload").window('open');
	$("#uploadform").form('reset');
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:关闭上传图片窗口
* 作者:邓文斌
* 日期:2015年1月22日 下午2:54:34
* </pre>
 */
function cancelUploadWindow() {
	$("#window_upload").window('close');
	$("#uploadform").form('clear');
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:新增
* 作者:邓文斌
* 日期:2015年1月22日 下午2:55:01
* </pre>
 */
function doAdd() {
	$('#imgPath_window').attr("src", "");
	$('#imgPath').attr("src", "");
	var asset_type = $("#cmbAssetType").combobox('getValue');
	var asset_sub_type = $("#cmbAssetSubType").combobox('getValue');
	var assetGenre = $("#cmbAssetGenre").combobox('getValue');
	var asset_dict_id = $("#cmbAssetName").combogrid('getValue');
	var asset_name = $("#cmbAssetName").combogrid('getText');
	var spec = $("#txtSpec").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var type = $("#txtType").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var price = $("#txtPrice").numberbox("getValue");
	var units = $("#cmbUnits").combobox('getValue');
	var quality_grade = $("#cmbQualityGrade").combobox('getValue');
	var category = $("#cmbCategory").combobox('getValue');
//	var location = $("#txtLocation").val();
	var usage = $("#cmbUsage").combobox('getValue');
	var dept = $("#cmbDept").combobox('getValue');
	var deviceType = $("#cmbDeviceType").combobox('getValue');
	
	var use_dept = $("#cmbUseDept").combobox('getValue');
	var buy_date = document.getElementById("txtBuyDate").value;
	var trustee = $("#cmbTrustee").combobox('getValue');
	var status = $("#cmbStatus").combobox('getValue');
	var guarantee_date = document.getElementById("txtGuaranteeDate").value;
	var effective_time = document.getElementById("txt_effective_time").value;
	//edit by 李宇 生产厂商电话、代理商电话去掉  2015年4月27日20:08:42 HRPASSETDEVJAVA-1263
	var salvage_ratio = $("#txtSalvageRatio").numberbox('getValue');
	var depreciation_method = $("#cmbDepreciationMethod").combobox('getValue');
	var depreciation_months = $("#txtDepreciationMonths").numberbox('getValue');
	var remaining_total = $("#txtRemainingTotal").numberbox('getValue');
	var depreciation_date = document.getElementById("timeDepreciationDate").value;
	var depreciation_method2 = $("#cmbDepreciationMethod2").combobox('getValue');
	var depreciation_months2 = $("#txtDepreciationMonths2").numberbox('getValue');
	var remaining_total2 = $("#txtRemainingTotal2").numberbox('getValue');
	var depreciation_date2 = document.getElementById("timeDepreciationDate2").value;
	var bidding_no = $("#txtBiddingNo").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var document_no = $("#txtDocumentNo").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var contarct_no = $("#txtContarctNo").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var finance_proof = $("#txtFinanceProof").val().replace(/^\s+/, "").replace(/\s+$/, "");
	//edit begin zhaoweijuan 2015年4月17日19:18:58 HRPASSETDEVJAVA-1238
	var archivelocation = $("#txtArchiveLocation").val();
	//edit by tian bo 2017年08月21日14:32:01
	if (getByteLen(spec) > 50) {
		$.messager.alert('温馨提示', '规格应控制在50个字符以内！', 'info');
		return;
	}
	if (getByteLen(type) > 100) {
		$.messager.alert('温馨提示', '型号应控制在100个字符以内！', 'info');
		return;
	}
	//edit end zhaoweijuan 2015年4月17日19:18:58 HRPASSETDEVJAVA-1238
	if (!IsDate(guarantee_date)) {
		return;
	}
	if (salvage_ratio > 1) {
		$.messager.alert('温馨提示', '残值率不能大于1', 'info');
		return;
	}
	//edit by 李宇 代理商电话、供应商电话去掉  2015年4月27日11:51:22  HRPASSETDEVJAVA-1263
	if (getByteLen(bidding_no) > 50) {
		$.messager.alert('温馨提示', '招标编号应控制在50个字符以内！', 'info');
		return;
	}
	//edit by wangke 2017年8月2日9:51:22 HRPASSETDEVJAVA-2311
	if (getByteLen(contarct_no) > 100) {
		$.messager.alert('温馨提示', '合同号应控制在100个字符以内！', 'info');
		return;
	}
	if (getByteLen(archivelocation) > 200) {
		$.messager.alert('温馨提示', '存档地址应控制在200个字符以内！', 'info');
		return;
	}
	if (getByteLen(finance_proof) > 200) {
		$.messager.alert('温馨提示', '财务凭证号应控制在200个字符以内！', 'info');
		return;
	}
	//edit by tian bo 2017年08月21日14:32:01
	var codeno = $("#cmbgridCodeNo").combogrid('getValue');
	if(isCountryCategory=="1"){
		if (codeno == null || codeno == undefined || codeno == "") {
			$.messager.alert('温馨提示', "请选择国家分类！", 'info');
			return;
		}
	}
	var memo = $("#txtMemo").val().replace(/^\s+/, "").replace(/\s+$/, "");
    var apply_no = $("#txtApply_No").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var recipients_user = $("#txtRecipientsUser").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var addition_no1 = $("#txtAdditionNo1").val().replace(/^\s+/, "").replace(
			/\s+$/, "");
	var addition_no2 = $("#txtAdditionNo2").val().replace(/^\s+/, "").replace(
			/\s+$/, "");
	var aed_id = $("#cmbAedCode").combobox('getValue');
	//edit begin by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
	var detailed_usage = $("#txtDetailedUsage").val().replace(/^\s+/, "").replace(
			/\s+$/, "");
	//edit end by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
	var certificate_due_date = document
			.getElementById("timeCertificateDueDate").value;
	var photo_path = $("#hd_photo_path").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var product_date = document.getElementById("timeProductDate").value;
	var location_aed_id = $("#cmbLocationAed").combobox('getValue');
	var location_dept_id = $("#cmbLocationDept").combobox('getValue');
	var building = $("#txtBuilding").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var floor = $("#txtFloor").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var ward = $("#txtWard").val().replace(/^\s+/, "").replace(/\s+$/, "");
	//edit by 李宇 获取生产厂商id、代理商id  2015年4月27日13:53:32 HRPASSETDEVJAVA-1263
	var manufacturerId = $("#cmbManufacturer").combogrid('getValue');
	var agentId = $("#cmbAgent").combogrid('getValue');
	var cmbCountrName =$("#cmbCountrName").combobox('getValue');

	//edit start by suihaochuan 2017年1月11日17:54:48
	//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
	var agentTel = $("#txtAgentTel").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var manufacturerTel = $("#txtManufacturerTel").val().replace(/^\s+/, "").replace(/\s+$/, "");
	//edit end by suihaochuan
	var accepter = $("#txtAccepter").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var buy_by = $("#txtBuyBy").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var recipients_no = $("#txtRecipientsNo").val().replace(/^\s+/, "")
			.replace(/\s+$/, "");
	var recipients_date = document.getElementById("timeRecipientsDate").value;
	var accept_date = document.getElementById("timeAcceptDate").value;
	var start_using_date = document.getElementById("timeStartUsingDate").value;
	var seq_no = $("#txtSeqNo").val().replace(/^\s+/, "").replace(/\s+$/, "");
	//edit begin by 李宇 2016年4月20日13:50:51 增加品牌字段值维护 HRPASSETDEVJAVA-1905
	var asset_brand = $("#txtAssetBrand").val().replace(/^\s+/, "").replace(/\s+$/, "");

	if (getByteLen(asset_brand) > 40) {
		$.messager.alert('温馨提示', "品牌长度不能超过40个字符！", 'info');
		return;
	}
	//edit end by 李宇 2016年4月20日13:50:51 增加品牌字段值维护 HRPASSETDEVJAVA-1905
	if (getByteLen(seq_no) > 100) {
		$.messager.alert('温馨提示', "出厂编号长度不能超过100个字符！", 'info');
		return;
	}
	if (getByteLen(accepter) > 40) {
		$.messager.alert('温馨提示', "验收人长度不能超过40个字符！", 'info');
		return;
	}
	if (getByteLen(buy_by) > 40) {
		$.messager.alert('温馨提示', "购买人长度不能超过40个字符！", 'info');
		return;
	}
	if (getByteLen(recipients_no) > 50) {
		$.messager.alert('温馨提示', "领用单号长度不能超过50个字符！", 'info');
		return;
	}
	if (asset_name == null || asset_name == undefined || asset_name == "") {
		$.messager.alert('温馨提示', setReplaceContrastData("请选择资产名称，资产名称不能为空！"),
				'info');
		return;
	}
	//edit start by suihaochuan 2016年12月27日12:50:48
	//HRPASSETDEVJAVA-2127 资产用途增加是否必填判断
	if(useRequired == "1"){
		if (!usage) {
			$.messager.alert('温馨提示', setReplaceContrastData("请选择用途，用途不能为空！"),
					'info');
			return;
		}
	}
	//edit end by suihaochuan
	if (asset_type == null || asset_type == undefined || asset_type == "") {
		$.messager.alert('温馨提示', setReplaceContrastData("请输入资产大类，资产大类不能为空！"),
				'info');
		return;
	}
	if (asset_sub_type == null || asset_sub_type == undefined
			|| asset_sub_type == "") {
		$.messager.alert('温馨提示', setReplaceContrastData("请选择资产子类，资产子类不能为空！"),
				'info');
		return;
	}
	if (price == null || price == undefined || price == "") {
		price = 0.00;
	}
	if (dept == null || dept == undefined || dept == "") {
		$.messager.alert('温馨提示', "请选择合法的管理部门！", 'info');
		return;
	}
	if (use_dept == null || use_dept == undefined || use_dept == "") {
		$.messager.alert('温馨提示', "请选择合法的使用部门！", 'info');
		return;
	}
	//edit begin by 李宇 2016年1月19日09:27:32 去掉启用时间必填校验 HRPASSETDEVJAVA-1813
//	if(start_using_date == null || start_using_date == undefined || start_using_date == ""){
//		$.messager.alert('温馨提示', "启用日期不能为空，请输入启用日期！", 'info');
//		return;
//	}
	//edit end by 李宇 2016年1月19日09:27:32 去掉启用时间必填校验 HRPASSETDEVJAVA-1813
	if(salvage_ratio == null || salvage_ratio == undefined || salvage_ratio == ""){
		salvage_ratio = 0.00;
	}
	if (isUseCard == "1") {
		if (addition_no1 == null || addition_no1 == undefined
				|| addition_no1 == "") {
			$.messager.alert('温馨提示', setReplaceContrastData("请输入"
					+ ASSET_BARCODE_NO_NAME + "，" + ASSET_BARCODE_NO_NAME
					+ "不能为空！"), 'info');
			return;
		}
	}
	if (getByteLen(addition_no1) > 50) {
		$.messager.alert('温馨提示', ASSET_BARCODE_NO_NAME + "长度不能超过50个字符，请重新输入！",
				'info');
		return;
	}
	if (getByteLen(addition_no2) > 50) {
		$.messager.alert('温馨提示', "RFID码长度不能超过50个字符，请重新输入！", 'info');
		return;
	}
	if (!IsDate(certificate_due_date)) {
		return;
	}
	if (DoCheckData('#cmbAedCode', aed_id, "请选择使用房间名称下拉列表中存在的数据")) {
		return;
	}
	if (DoCheckData('#cmbLocationAed', location_aed_id, "请选择定位房间名称下拉列表中存在的数据")) {
		return;
	}
	if (getByteLen(building) > 100) {
		$.messager.alert('温馨提示', "楼号输入长度请控制在100个字符内！", 'info');
		return;
	}
	if (getByteLen(floor) > 100) {
		$.messager.alert('温馨提示', "层号输入长度请控制在100个字符内！", 'info');
		return;
	}
	if (getByteLen(ward) > 100) {
		$.messager.alert('温馨提示', "病区输入长度请控制在100个字符内！", 'info');
		return;
	}
	//edit begin 李文康 保管人改为非必填项 2015年4月10日13:11:02 HRPASSETDEVJAVA-1225	
//	if (trustee == null || trustee == "" || trustee == undefined) {
//		$.messager.alert('温馨提示', "保管人不能为空！", 'info');
//		return;
//	}
	//edit end 李文康 保管人改为非必填项  2015年4月10日13:11:07 HRPASSETDEVJAVA-1225
	//Edit begin by PanWeidong 2016-09-30 11:22
	//HRPMTRDEVJAVA-1375 资产信息维护界面直接选择资产名称，资产大类，子类自动添加到界面上（目前必须先选择大类，子类，才能选择资产名称，影响效率）
//	if (DoCheckData('#cmbAssetType', asset_type,
//			setReplaceContrastData("请选择资产大类下拉列表中存在的数据"))) {
//		return;
//	}
//	if (DoCheckData('#cmbAssetSubType', asset_sub_type,
//			setReplaceContrastData("请选择资产子类别下拉列表中存在的数据"))) {
//		return;
//	}
	//Edit end by PanWeidong 2016-09-30 11:22
	if (DoCheckData('#cmbUnits', units,
			setReplaceContrastData("请选择资产单位下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbQualityGrade', quality_grade,
			setReplaceContrastData("请选择资产质控等级下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbCategory', category,
			setReplaceContrastData("请选择资产管理分类下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbUsage', usage,
			setReplaceContrastData("请选择资产用途下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbDept', dept, "请选择管理部门下拉列表中存在的数据")) {
		return;
	}
	if (DoCheckData('#cmbUseDept', use_dept,
			setReplaceContrastData("请选择资产使用部门下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbTrustee', trustee,
			setReplaceContrastData("请选择资产保管人下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbStatus', status,
			setReplaceContrastData("请选择资产状态下拉列表中存在的数据"))) {
		return;
	}
	if (DoCheckData('#cmbCountrName', cmbCountrName,
			setReplaceContrastData("请选择国别字典中的数据！"))) {
		return;
	}
	//edit by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
	if (DoCheckData('#cmbLocationDept', location_dept_id, "请选择定位部门下拉列表中存在的数据")) {
		return;
	}
	if (!IsDate(recipients_date)) {
		return;
	}
	if (!IsDate(accept_date)) {
		return;
	}
	if (!IsDate(start_using_date)) {
		return;
	}
	if (DoCheckData('#cmbDepreciationMethod', depreciation_method, "请选择核算折旧方法下拉框中已有的折旧方法！")) {
		return;
	}
	if (!IsDate(depreciation_date)) {
		return;
	}
	if (DoCheckData('#cmbDepreciationMethod2', depreciation_method2, "请选择财务折旧方法下拉框中已有的折旧方法！")) {
		return;
	}
	if (!IsDate(depreciation_date2)) {
		return;
	}
	//edit begin zhaoweijuan 2015年1月27日16:00:59 HRPASSETDEVJAVA-1044
	var fund_amount_1 = $("#txtFundAmount1").numberbox("getValue");
	var fund_amount_2 = $("#txtFundAmount2").numberbox("getValue");
	var app_licence = $("#txtAppLicence").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var app_date = document.getElementById("timeAppDate").value;
	var app_invalid_date = document.getElementById("timeAppInvalidDate").value;
	var setup_licence = $("#txtSetupLicence").val();
	var setup_date = document.getElementById("timeSetupDate").value;
	var use_years = $("#txtUseYears").numberbox("getValue");
	var fund_source = $("#cmbFundSource").combobox('getValues').join(",");//HRPASSETDEVJAVA-2176	资产信息维护可维护多个经费来源

	//edit begin 李文康 增加资产区域 2015年3月30日17:21:36 HRPASSETDEVJAVA-1188
	var assetArea = $("#cmbAssetArea").combobox('getValue');	
	//edit end 李文康 增加资产区域  2015年3月30日17:21:39 HRPASSETDEVJAVA-1188
	var invoice_no = $("#txtInvoiceNo").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var invoice_code = $("#txtInvoiceCodeDetail").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var repair_flag = $("#cmbRepairFlag").combobox("getValue");
	//edit by wangke 2017年8月2日10:33:40  发票号长度控制 HRPASSETDEVJAVA-2311
	if (getByteLen(invoice_no) > 200) {
		$.messager.alert('温馨提示', '发票号应控制在200个字符以内！', 'info');
		return;
	}
	if (getByteLen(invoice_code) > 200) {
		$.messager.alert('温馨提示', '发票代码应控制在200个字符以内！', 'info');
		return;
	}
	if(fund_amount_1 > 999999999.99){
		$.messager.alert('温馨提示', "下拨金额不能超过999999999.99！", 'info');
		return;
	}
	if(fund_amount_2 > 999999999.99){
		$.messager.alert('温馨提示', "自筹金额不能超过999999999.99！", 'info');
		return;
	}
	if(use_years > 99.9){
		$.messager.alert('温馨提示', "使用年限不能超过99.9！", 'info');
		return;
	}
	if (!IsDate(app_date)) {
		return;
	}
	if (!IsDate(app_invalid_date)) {
		return;
	}
	if (!IsDate(setup_date)) {
		return;
	}
	/*if (DoCheckData('#cmbFundSource', fund_source, "请选择经费来源下拉列表中存在的数据")) {
		return;
	}*/
	//edit begin 李文康 增加资产区域 2015年3月30日17:21:36 HRPASSETDEVJAVA-1188
	if (DoCheckData('#cmbAssetArea', assetArea, setReplaceContrastData("请选择资产区域下拉列表中存在的数据"))) {
		return;
	}
	//edit end 李文康 增加资产区域  2015年3月30日17:21:39 HRPASSETDEVJAVA-1188	
	//edit begin zhaoweijuan 2015年4月2日20:03:27 HRPASSETDEVJAVA-1186
	var dealEngineer = $("#cmbDealEngineer").combobox('getValue');
	if (DoCheckData('#cmbDealEngineer', dealEngineer, setReplaceContrastData("请选择维修人下拉列表中存在的数据！"))) {
		return;
	}
	//edit end zhaoweijuan 2015年4月2日20:03:27 HRPASSETDEVJAVA-1186
	
	//edit end zhaoweijuan 2015年1月27日16:00:59 HRPASSETDEVJAVA-1044
	if (DoCheckData('#cmbRepairFlag', repair_flag, "请选择送修标记下拉列表中存在的数据")) {
		return;
	}
	//edit end by 李宇  2015年4月27日13:56:39 生产厂商和供应商是否存在于供应商表中的验证  HRPASSETDEVJAVA-1263
	//edit begin 李文康  新增附属设备的维护 2015年10月9日11:52:10 HRPASSETDEVJAVA-1646
	var assetId = $("#hd_SM_ID").val();
	var insertedString = "";
	var cpms_ids = "";
	if (assetId == null || assetId == "" || assetId == undefined) {	
		var inserted = $("#dgAssetBasicPart").datagrid('getRows');
		// 类似JSONTOSTRING，将对象数据转化为字符串，分隔符自定义(对象之间使用|分隔)
		for (var i = 0; i < inserted.length; i++) {
			if (i == 0) {
				insertedString = jsonToString(inserted[i]);
			} else {
				insertedString += "|" +jsonToString(inserted[i]);
			}
		}
		var asset_vs_cpms = $('#dgRelation').datagrid('getRows');
		for(var i=0;i<asset_vs_cpms.length;i++){
			if(i == 0){
				cpms_ids += asset_vs_cpms[i]['CPMS_ID'];
			}else{
				cpms_ids += "|";
				cpms_ids += asset_vs_cpms[i]['CPMS_ID'];
			}
		}
		
	}
	
	//edit end 李文康  新增附属设备的维护 2015年10月9日11:52:15 HRPASSETDEVJAVA-1646
	var isImportAsset = $("input[name='rdIsImportAsset']:checked").val();
	
	var impTypeCode = $("#cmbImpType").combobox("getValue");//edit add by lidu 2016年3月12日15:00:01HRPASSETDEVJAVA-1851
	if(impTypeCode===null || impTypeCode === undefined){
		impTypeCode = "";
	}
	
	//EDIT ADD BEGIN LIDU 2016年3月14日10:44:46	
    var installLocation  = '';
    if (isUseAdressDict == '1') {
        installLocation= $("#cmbInstallLocation").combobox('getText');        
    	if(DoCheckData('#cmbInstallLocation',$("#cmbInstallLocation").combobox('getValue'),"请选择下拉框中存在的安装地点！")){
            return;
        }        
    } else {
        installLocation = $("#txtInstallLocation").val();
    }
	var maintenanceInfo = $("#txtMaintenaceInfo").val();//HRPASSETDEVJAVA-1850
	if(installLocation===null || installLocation === undefined){
		installLocation = "";	
	}
	if( maintenanceInfo===null || maintenanceInfo === undefined){		
		maintenanceInfo = "";
	}
	//EDIT ADD END LIDU 2016年3月14日10:45:21
	//edit start by suihaochuan 2017年1月12日19:55:25
	//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
	if(IsNullOrEmpty(manufacturerId)&&!IsNullOrEmpty(manufacturerTel)){
		$.messager.alert('温馨提示', "不能只填写供应商电话而不选择供应商", 'info');
		return;
	}
	if(IsNullOrEmpty(agentId)&&!IsNullOrEmpty(agentTel)){
		$.messager.alert('温馨提示', "不能只填写生产厂商电话而不选择生产厂商", 'info');
		return;
	}
	//edit start by suihaochuan
	var is_economic_benefit = $('#cmbIsEconomicBenefit').combobox('getValue');
	//add by wangxiani 2017年3月2日15:23:23 HRPASSETDEVJAVA-2176	资产信息维护可维护多个经费来源
	var fInsertedArr = new Array();
	var fUpdatedSArr = new Array();
	var fDeletedStr = "";
	if(endEditing()){
		if(!checkFundSourceRow(price)){//检验经费项目数据
			return;
		}
		if($("#dgFundSource").datagrid('getChanges').length > 0){
			var fInsertRow = $('#dgFundSource').datagrid('getChanges','inserted');
			for (var i = 0; i < fInsertRow.length; i++) {
				fInsertedArr.push(fInsertRow[i]);
			}
            
			var fDeleteRow = $('#dgFundSource').datagrid('getChanges','deleted');
			for (var i = 0; i < fDeleteRow.length; i++) {
				if (i == 0) {
					fDeletedStr = fDeleteRow[i].FUND_SOURCE_ID;
				} else {
					fDeletedStr += ",";
					fDeletedStr += fDeleteRow[i].FUND_SOURCE_ID;
				}
			}
			
			//var fUpdateRow = $('#dgFundSource').datagrid('getChanges','updated');
			var fUpdateRow = $('#dgFundSource').datagrid('getRows');
			for (var i = 0; i < fUpdateRow.length; i++) {
				var flag =false;
				for (var j = 0; j < fInsertRow.length; j++) {
					if(fInsertRow[j].FUND_SOURCE == fUpdateRow[i].FUND_SOURCE){
						flag = true;
						break;
					}
				}
				for (var k = 0; k < fDeleteRow.length; k++) {
					if(fDeleteRow[k].FUND_SOURCE == fUpdateRow[i].FUND_SOURCE){
						flag = true;
						break;
					}
				}
				if(!flag){
					fUpdatedSArr.push(fUpdateRow[i]);
				}				
			}
		}
	}else{
		return;
	}
	
	//add end by wangxiani 2017年3月2日15:23:35
	var obj = {
		"asset_type" : asset_type,
		"asset_sub_type" : asset_sub_type,
		"asset_name" : asset_name,
		"asset_dict_id" : asset_dict_id,
		"spec" : spec,
		"type" : type,
		"amount" : 1,
		"price" : price,
		"units" : units,
		"quality_grade" : quality_grade,
		"category" : category,
//		"location" : location,
		'buy_date' : buy_date,
		"usage" : usage,
		"dept" : dept,
		"device_type":deviceType,
		"use_dept" : use_dept,
		"trustee" : trustee,
		"status" : status,
		"memo" : memo,
		"recipients_user" : recipients_user,
		"asset_id" : assetId,
		"addition_no1" : addition_no1,
		"addition_no2" : addition_no2,
		"aed_id" : aed_id,
		"detailed_usage" : detailed_usage,
		"certificate_due_date" : certificate_due_date,
		"photo_path" : photo_path,
		"product_date" : product_date,
		"building" : building,
		"floor" : floor,
		"ward" : ward,
		"location_aed_id" : location_aed_id,
		"location_dept_id" : location_dept_id,
		"manufacturerId" : manufacturerId,//edit by 李宇  2015年4月27日13:55:33 
		"agentId" : agentId,
		//edit start by suihaochuan 2017年1月12日13:40:25
		//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
		"agentTel" : agentTel,
		"manufacturerTel" : manufacturerTel,
		//edit end by suihaochuan
		"accepter" : accepter,
		"buy_by" : buy_by,
		"recipients_no" : recipients_no,
		"codeno" : codeno,
		"seq_no" : seq_no,
		"recipients_date" : recipients_date,
		"accept_date" : accept_date,
		"start_using_date" : start_using_date,
		"guarantee_date" : guarantee_date,
		"effective_time" : effective_time,
		//edit by 李宇 代理商电话、生产厂商电话去掉  2015年4月27日11:51:22  HRPASSETDEVJAVA-1263
		"salvage_ratio" : salvage_ratio,
		"depreciation_method" : depreciation_method,
		"depreciation_months" : depreciation_months,
		"remaining_total" : remaining_total,
		"depreciation_date" : depreciation_date,
		"depreciation_method2" : depreciation_method2,
		"depreciation_months2" : depreciation_months2,
		"remaining_total2" : remaining_total2,
		"depreciation_date2" : depreciation_date2,
		"bidding_no" : bidding_no,
		"document_no" : document_no,
		"contarct_no" : contarct_no,
		//edit begin zhaoweijuan 2015年1月27日16:06:01
		"fund_amount_1" : fund_amount_1,
		"fund_amount_2" : fund_amount_2,
		"app_licence" : app_licence,
		"app_date" : app_date,
		"app_invalid_date" : app_invalid_date,
		"setup_licence" : setup_licence,
		"setup_date" : setup_date,
		"use_years":use_years,
		"fund_source":fund_source,
		"invoice_no":invoice_no,
		//edit begin 李文康 增加资产区域 2015年3月30日17:21:36 HRPASSETDEVJAVA-1188
		"assetArea":assetArea,
		//edit end 李文康 增加资产区域  2015年3月30日17:21:39 HRPASSETDEVJAVA-1188		
		//edit begin zhaoweijuan 2015年1月27日16:06:01
		//edit begin zhaoweijuan 2015年4月2日20:03:27 HRPASSETDEVJAVA-1186
		"dealEngineer":dealEngineer,
		//edit end zhaoweijuan 2015年4月2日20:03:27 HRPASSETDEVJAVA-1186
		"repair_flag":repair_flag,
		"timestamp" : timestamp,
		"insertedString" : insertedString,
		"isImportAsset" : isImportAsset,
		"impTypeCode" : impTypeCode,//edit add by lidu 2016年3月12日15:00:01HRPASSETDEVJAVA-1851
		"installLocation" : installLocation, //edit add by lidu 2016年3月12日15:00:01HRPASSETDEVJAVA-1849
		"maintenanceInfo" : maintenanceInfo,//edit add by lidu 2016年3月12日15:00:01HRPASSETDEVJAVA-1850
		"IS_ECONOMIC_BENEFIT":is_economic_benefit,
		//edit begin by 李宇 2016年4月20日13:50:51 增加品牌字段值维护 HRPASSETDEVJAVA-1905
		"asset_brand":asset_brand,//品牌
		"fInsertedArr" : JSON.stringify(fInsertedArr),
		"fUpdatedSArr":JSON.stringify(fUpdatedSArr),
		"fDeletedStr":fDeletedStr,
		"assetGenre":assetGenre,
		"archivelocation":archivelocation,
		"cmbCountrName":cmbCountrName,
		"finance_proof":finance_proof,
		"invoice_code":invoice_code,
		"cpms_ids":cpms_ids,
        "apply_no":apply_no
	};
	$.messager.progress({
		text : "正在处理，请稍候。。。"
	});
	
	$.ajax({
		type : "POST",
		url : action + "DoQuerySameSeqNo",
		data : obj,
		dataType : "json",
		success : function(data) {
			if(data.message != ""){
				$.messager.confirm('温馨提示', data.message, function(r) {
					if (r) {
						vu.sdsEnableFlag ? doSaveInfoSds(obj) : doSaveInfo(obj);
					} else {
						$.messager.progress('close');
						return;				
					}
				});
			}else{
				vu.sdsEnableFlag ? doSaveInfoSds(obj) : doSaveInfo(obj);
			}
			
		},
		error : function(data) {
			$.messager.progress('close');
			ajaxError(data, "保存失败");
		}
	});
	
}
/* 
* 
* <pre>
* 任务号：
* 描述：不启用sds保存资产信息
* 作者：杨婷婷
* 时间：2018年7月9日上午10:29:26
*@param obj
*/
function doSaveInfo(obj) {
	$.ajax({
		type : "POST",
		url : action + "doAdd",
		dataType : 'json',
		data : obj,
		success : function(json) {
			$.messager.progress('close');
			if (json.success) {
				$.messager.alert('温馨提示', json.message, 'info',
					function(){
					 cancelAdd(true);//edit by zhaoweijuan 2015年3月13日13:42:22 HRPASSETDEVJAVA-1144
				});
			} else {
				$.messager.alert('温馨提示', json.message, 'error');
			}
		},
		error : function(data) {
			ajaxError(data, '温馨提示');
		}
	});
}
/* 
* 
* <pre>
* 任务号：
* 描述：启用sds保存资产信息
* 作者：杨婷婷
* 时间：2018年7月9日上午10:29:26
*@param obj
*/
function doSaveInfoSds(obj){
    var viewRef = vu.$refs.formRef;
    viewRef.getElement(viewRef.formCode).validate(function(valid) {
        if (!valid) {
            $.messager.alert('温馨提示', '请输入必填信息', 'info');
            $.messager.progress('close');
            return;
        } else {
            $.ajax({
                type: "POST",
                url: action + "doAdd",
                dataType: 'json',
                data: obj,
                success: function (json) {
                    if (json.success) {
                        vu.assetId = json.data;
                        viewRef.saveBusinessData(function (params) {
                            //业务组处理value回调
                        }, function (res) {
                            //保存成功回调
                        	$.messager.progress('close');
                            $.messager.alert('温馨提示', json.message, 'info', function () {
                                cancelAdd(true);
                            });
                        }, function (res) {
                            //保存失败回调
                        	 $.messager.progress('close');
                            $.messager.alert('温馨提示', '保存失败', 'error');
                        });

                    } else {
                    	$.messager.progress('close');
                        $.messager.alert('温馨提示', json.message, 'error');
                    }
                },
                error: function (data) {
                    ajaxError(data, '温馨提示');
                }
            });
        }
    });
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:上传本地图片至服务器
* 作者:邓文斌
* 日期:2015年1月22日 下午2:55:56
* </pre>
 */
function doUploadImgToServer() {
	var asset_type_code = $("#hd_asset_type_code").val();
	var pic_name = $('#txtPhotoPath').val();
	var attachment_description = $('#txtAttachmentDescription').val();
	$.messager.progress({
		text : '图片正在上传，请稍侯。。。'
	});
	$("#uploadform")
			.ajaxSubmit(
					{
						type : "POST",
						//async : false, //HRPASSETDEVJAVA-2171
						url : action + "uploadImage&asset_type_code=" + asset_type_code
								+ "&asset_id=" + asset_id + "&attachment_description=" + attachment_description 
								+ "&creator=" + timestamp,
						success : function(json) {
							$.messager.progress('close');
							json = eval("(" + json + ")");
							if (json.success) {
								cancelUploadWindow();
								$('#hd_photo_path').val(json.message);
								$('#imgPath_window').attr(
										"src",
										"../../../AttachView/" + json.message + "&zc="
												+ new Date());
								$.messager.alert("上传提示", "上传成功！", 'info');
								return;
							} else {
								$.messager.alert("上传提示", json.message, 'info');
							}
						},
						error : function(json) {
							$.messager.progress('close');
						}
					});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:附件列表窗口显示资产图片
* 作者:邓文斌
* 日期:2015年1月22日 下午2:56:35
* @param photo_path
* @param asset_id
* </pre>
 */
function doDisplayPic(photo_path, asset_id,attach_id,attach_config_id) {
	var path = photo_path+"?PATH_CONFIG="+attach_config_id
	$('#hd_pic_asset_id').val(asset_id);
	$('#hd_attachment_url').val(path);
	$('#hd_attach_id').val(attach_id);
	
	$('#btnSetDisplayPhoto').show();
	$('#btnDeletePhoto').show();
	$('#window_picture').window({
		title : setReplaceContrastData("资产图片")
	});
	$('#window_picture').window('open');
	var picPath = "../../../AttachView/" + path;
	$('#imgPath').attr("src", picPath + "&zwj=" + new Date());
	$('#imgPath').attr("alt", "图片未找到！");
}
//function doDisplayPhoto(photo_path) {
//	$('#hd_pic_asset_id').val("");
//	$('#hd_attachment_url').val(photo_path);
//	$('#btnSetDisplayPhoto').hide();
//	$('#btnDeletePhoto').hide();
//	$('#window_picture').window({
//		title : setReplaceContrastData("资产图片")
//	});
//	$('#window_picture').window('open');
//	var picPath = "../../../" + photo_path;
//	$('#imgPath').attr("src", picPath + "?zwj=" + new Date());
//	$('#imgPath').attr("alt", "图片未找到！");
//}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:双击显示图片大图
* 作者:邓文斌
* 日期:2015年1月22日 下午2:57:06
* </pre>
 */
function doDBDisplayPic() {
	var photo_path = $("#hd_photo_path").val();
	if (photo_path != null && photo_path != undefined && photo_path != "") {
		$('#btnSetDisplayPhoto').hide();
		$('#btnDeletePhoto').hide();
//		var photo_path = $('#hd_photo_path').val();
		$('#window_picture').window({
			title : setReplaceContrastData("资产图片")
		});
		$('#window_picture').window('open');
		var picPath = "../../../AttachView/" + photo_path;
		$('#imgPath').attr("src", picPath + "&zwj=" + new Date());
		$('#imgPath').attr("alt", "图片未找到");
	}
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:显示图片列表按钮
* 作者:邓文斌
* 日期:2015年1月22日 下午2:57:28
* </pre>
 */
function doSelectPicWindow() {
	$('#pic_list_window').window('open');
	var asset_id = $("#hd_asset_id").val();
	$('#dgPicList').datagrid('load', {
		"asset_id" : asset_id,
		"attachment_format" : "IMG"
	});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:设置资产主图片
* 作者:邓文斌
* 日期:2015年1月22日 下午2:57:45
* </pre>
 */
function doSetDisplayPhoto() {
	var asset_id = $('#hd_pic_asset_id').val();
	var attachment_url = $('#hd_attachment_url').val();
	var selectRow = $('#dgPicList').datagrid('getSelected');
	var obj = {
		"asset_id" : asset_id,
		"attachment_id":selectRow.ATTACHMENT_ID,
		"attachment_url" : attachment_url
	};
	$.messager.progress({
		text : "正在处理，请稍候。。。"
	});
	$.ajax({
		type : "POST",
		url : action + "doSetDisplayPhoto",
		dataType : 'json',
		data : obj,
		success : function(json) {
			$.messager.progress('close');
			if (json.success) {
//				$('#dgPicList').datagrid('reload');
				$('#dg').datagrid('reload');
				$.messager.alert('温馨提示', json.message, 'info');
				$('#hd_photo_path').val(attachment_url);
				$('#imgPath_window').attr("src",
						"../../../AttachView/" + attachment_url + "&zc=" + new Date());
			} else {
				$.messager.alert('温馨提示', json.message, 'error');
			}
		},
		error : function(data) {
			ajaxError(data, '温馨提示');
		}
	});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:save
* 作者:邓文斌
* 日期:2015年1月22日 下午2:57:45
* </pre>
 */
function ctrlssave(e) {
	if (e.ctrlKey == 1) {
		if (document.all) {
			k = e.keyCode
		} else {
			k = e.which
		}
		if (k == 83) {
			doAdd();
			e.returnValue = false;
		}
	}

}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:给国家码赋值
* 作者:邓文斌
* 日期:2015年1月22日 下午2:59:09
* </pre>
 */
function getCodeNo() {
	var grid = $("#cmbgridCodeNo").combogrid("grid");
	var selectRow = grid.datagrid('getSelected');
	if (selectRow != null && selectRow != undefined && selectRow != "") {
		code_name = selectRow["CODE_NAME"];
		code68 = selectRow["CODE68"];
		code32 = selectRow["CODE32"];
	} else {
		code_name = "";
		code68 = "";
		code32 = "";
	}
	changeShowCode();
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:切换国家码
* 作者:邓文斌
* 日期:2015年1月22日 下午2:59:43
* </pre>
 */
function changeShowCode() {
	var grid = $("#cmbgridCodeNo").combogrid("grid");
	var selectRow = grid.datagrid('getSelected');
	if (selectRow != null && selectRow != undefined && selectRow != "") {
		if (showCodeNo == 1) {
			showCodeNo = 0;
			$('#txtCode').val(code68);
		} else {
			showCodeNo = 1;
			$('#txtCode').val(code32);
		}
	} else {
		$('#txtCode').val('');
	}
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:根据资产id查询并初始化修改界面
* 作者:邓文斌
* 日期:2015年1月22日 下午3:01:06
* </pre>
 */
function doQueryInfo(){
	var obj={
		"asset_id" : asset_id	
	    };
		$.ajax({
			type : "POST",
			url : action + "doQueryInfo",		
			data : obj,
			dataType : 'json',
			success : function(data) {
				var assetQualificationInfo = data.DataTable;
				$('#tab_center').tabs('select', 0);
				$("#hd_SM_ID").val(asset_id);
				$("#hd_asset_id").val(asset_id);
				if (data.DataTable.row.length == 1) {
					for (var i = 0; i < data.DataTable.row[0].col.length; i++) {
						var columnName = data.DataTable.row[0].col[i].key;
						var columnValue = data.DataTable.row[0].col[i].value;
						if ("ITEM_ID" == columnName){
							assetTypeDictId = columnValue;
							vu.sdsEnableFlag && (vu.assetTypeDictValue.assetTypeDict = assetTypeDictId);
							continue;
						}
						//edit begin zhaoweijuan 2015年4月17日20:14:54 HRPASSETDEVJAVA-1238
						if ("ASSET_NO" == columnName){
							$("#txtAssetNo").val(columnValue);
							continue;
						}
						//edit end zhaoweijuan 2015年4月17日20:14:54 HRPASSETDEVJAVA-1238 
						//edit by 李宇 2015年4月27日20:09:51 生产厂商电话、代理商电话去掉 HRPASSETDEVJAVA-1263
						if ("FINANCE_PROOF_NO" == columnName){
							$("#txtFinanceProof").val(columnValue);
							continue;
						}
						if ("BIDDING_NO" == columnName){
							$("#txtBiddingNo").val(columnValue);
							continue;
						}
						if ("DOCUMENT_NO" == columnName){
							$("#txtDocumentNo").val(columnValue);
							continue;
						}
						if ("CONTARCT_NO" == columnName){
							$("#txtContarctNo").val(columnValue);
							continue;
						}
						if ("DEVICE_TYPE" == columnName){
							$("#cmbDeviceType").combobox('setValue', columnValue);
							continue;
						}
						var guarantee_date = "";
						if ("GUARANTEE_DATE" == columnName){
							 guarantee_date = columnValue;
							if (guarantee_date == null || guarantee_date == undefined
									|| guarantee_date == "") {
								$("#txtGuaranteeDate").datetimepicker({
									value : ""
								});
							} else {
								$("#txtGuaranteeDate").datetimepicker({
									value : dateFormatterYMD(guarantee_date)
								});
							}
							continue;
						}			
						if ("EFFECTIVE_TIME" == columnName){
							$("#txt_effective_time").val(columnValue);
							continue;
						}
						if ("IMPORT_DATE" == columnName){
							importDate = columnValue;
							continue;
						}
						var asset_type_id = "";
						if ("ASSET_TYPE_ID" == columnName){
						    asset_type_id =  columnValue ;
						    $("#cmbAssetType").combobox('setValue', columnValue);
//							if (asset_type_id != null && asset_type_id != undefined
//									&& asset_type_id != "" && !isEditAssetInfo) {
//								//edit by 李宇 如果资产大类不为空，并且没有资产修改权限时不可修改资产大类  HRPASSETDEVJAVA-1819
//								$("#cmbAssetType").combobox('disable');
//							} else {
//								$("#cmbAssetType").combobox('enable');
//							}
							continue;
						}
						if ("ASSET_SUB_TYPE_ID" == columnName){
							$("#cmbAssetSubType").combobox('setValue',columnValue);
							continue;
						}
						if ("ASSET_DICT_ID" == columnName){
							$("#cmbAssetName").combogrid('setValue',columnValue);
							continue;
						}
						if ("ASSET_NAME" == columnName){
							$("#cmbAssetName").combogrid('setText',columnValue);
							continue;
						}
		
						if ("SPEC" == columnName){
							$("#txtSpec").val(columnValue);
							continue;
						}
						if ("TYPE1" == columnName){
							$("#txtType").val(columnValue);
							continue;
						}
						if ("PRICE" == columnName){
							$("#txtPrice").numberbox('setValue',columnValue);
							continue;
						}
						if ("LOCATION_DEPT_ID" == columnName){
							$("#cmbLocationDept").combobox('select',columnValue);//定位部门
							continue;
						}
						if ("LOCATION_AED_ID" == columnName){
							$("#cmbLocationAed").combobox('setValue',columnValue);//定位房间
							continue;
						}
						if ("UNITS_ID" == columnName){
							$("#cmbUnits").combobox('setValue',columnValue);
							continue;
						}
						if ("QUALITY_GRADE_ID" == columnName){
							$("#cmbQualityGrade").combobox('setValue',columnValue);
							continue;
						}
						if ("CATEGORY_ID" == columnName){
							$("#cmbCategory").combobox('setValue',columnValue);
							continue;
						}
//						if ("LOCATION" == columnName){
//							$("#txtLocation").val('setValue',columnValue);
//							continue;
//						}
						if ("USAGE_ID" == columnName){
							$("#cmbUsage").combobox('setValue',columnValue);
							continue;
						}
						if ("DEPT_ID_1" == columnName){
							if (columnValue == -100)
								{
								  $("#cmbDept").combobox('setValue', '');
								  $("#cmbDept").combobox('enable');
								} 		
							else {
								$("#cmbDept").combobox('setValue', columnValue);
								$("#cmbDept").combobox('disable');
							}
							continue;
						}
						if ("CODE_NO" == columnName){
							$("#cmbgridCodeNo").combogrid('setValue',columnValue);
							continue;
						}
						if ("CODE_NAME" == columnName){
							code_name = columnValue;
							$("#cmbgridCodeNo").combogrid('setText', code_name);
							continue;
						}
						if ("CODE68" == columnName){
							code68 = columnValue;
							$('#txtCode').val(code68);
							continue;
						}
						if ("CODE32" == columnName){
						    code32 = columnValue;
						    $('#txtCode').val(code32);
						    continue;
						}
			
						if ("SEQ_NO" == columnName){
							$("#txtSeqNo").val(columnValue);
							continue;
						}
						var product_date ="";
						if ("PRODUCT_DATE" == columnName){
							product_date = columnValue;
							if (product_date == null || product_date == undefined || product_date == "") {
								$("#timeProductDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeProductDate").datetimepicker({
									value : dateFormatterYMD(product_date)
								});
							}
							continue;
						}
						if ("USE_DEPT_ID_1" == columnName){
							if (columnValue == -100) {
								$("#cmbUseDept").combobox('setValue', '');//使用部门
							} else {
								$("#cmbUseDept").combobox('setValue', columnValue);
							}
							continue;
						}	
						var buy_date = "";
						if ("BUY_DATE" == columnName){
							 buy_date = columnValue;
							 if (buy_date == null || buy_date == undefined || buy_date == "") {
									$("#txtBuyDate").datetimepicker({
										value : ""
									});
								} else {
									$("#txtBuyDate").datetimepicker({
										value : dateFormatterYMD(buy_date)
									});
								}
							 continue;
						}
						if ("TRUSTEE_ID" == columnName){
							// edit begin by libin 2016年11月8日9:56:41 HRPASSETDEVJAVA-2100
							// 此处直接赋值时保管人下拉框还没有初始化,保存到临时变量，待初始化后再赋值
							 $("#cmbTrustee").combobox('setValue', columnValue);
							 trustee = columnValue ;
							// edit end by libin 2016年11月8日9:56:41 HRPASSETDEVJAVA-2100
							 continue;
						}
						if ("STATUS_ID" == columnName){
							 $("#cmbStatus").combobox('setValue', columnValue);
							 continue;
							 }
						if ("ASSET_GENRE" == columnName){
							 $("#cmbAssetGenre").combobox('setValue', columnValue);
							 continue;
							 }
						if ("MEMO1" == columnName){
							 $("#txtMemo").val(columnValue);
							 continue;
							 }
                        if ("APPLY_NO" == columnName){
                            $("#txtApply_No").val(columnValue);
                            continue;
                        }

                        if ("RECIPIENTS_USER" == columnName){
							 $("#txtRecipientsUser").val(columnValue);
							 continue;
							 }
						var recipients_date ="";
						if ("RECIPIENTS_DATE" == columnName){
							 recipients_date = columnValue;
							 if (recipients_date == null || recipients_date == undefined
										|| recipients_date == "") {
									$("#timeRecipientsDate").datetimepicker({
										value : ""
									});
								} else {
									$("#timeRecipientsDate").datetimepicker({
										value : dateFormatterYMD(recipients_date)
									});
								}
							 continue;
							 }					
						
						var accept_date ="";
						if ("ACCEPT_DATE" == columnName){
							accept_date = columnValue;
							if (accept_date == null || accept_date == undefined || accept_date == "") {
								$("#timeAcceptDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeAcceptDate").datetimepicker({
									value : dateFormatterYMD(accept_date)
								});
							}
							continue;
							}					
						var start_using_date ="";
						if ("START_USING_DATE" == columnName){
							start_using_date = columnValue;
							if (start_using_date == null || start_using_date == undefined
									|| start_using_date == "") {
								$("#timeStartUsingDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeStartUsingDate").datetimepicker({
									value : dateFormatterYMD(start_using_date)
								});
							}
							continue;
							}	
						if ("MANUFACTURER_ID" == columnName){
							$("#cmbManufacturer").combogrid('setValue', columnValue);
							continue;
							}
						if ("MANUFACTURER" == columnName){
							$("#cmbManufacturer").combogrid('setText', columnValue);
							continue;
							}
						//edit start by suihaochuan 2017年1月12日17:58:45
						//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
						if ("MANUFACTURER_TEL" == columnName){
							$("#txtManufacturerTel").val(columnValue);
							continue;
							}
						//edit end by suihaochuan 
						if ("SUPPLIER_INFO_ID" == columnName){
							$("#cmbAgent").combogrid('setValue', columnValue);
							continue;
							}
					 
						if ("COUNTR_NAME" == columnName){
							$("#cmbCountrName").combobox('setValue', columnValue);
							continue;
							}
						
						if ("AGENT" == columnName){
							$("#cmbAgent").combogrid('setText', columnValue);
							continue;
							}
						//edit start by suihaochuan 2017年1月12日17:57:58
						//HRPASSETDEVJAVA-2141 资产基本信息维护模块，维护资产信息时增加“售后服务电话”“供应商电话”的维护，并在查看时可显示
						if ("AGENT_TEL" == columnName){
							$("#txtAgentTel").val(columnValue);
							continue;
							}
						//edit end by suihaochuan
						if ("ACCEPTER" == columnName){
							$("#txtAccepter").val(columnValue);
							continue;
							}
						if ("BUY_BY" == columnName){
							$("#txtBuyBy").val(columnValue);
							continue;
							}
						if ("RECIPIENTS_NO" == columnName){
							$("#txtRecipientsNo").val(columnValue);
							continue;
							}
						if ("ASSET_ADDITION_NO1" == columnName){
							$("#txtAdditionNo1").val(columnValue);
							continue;
							}
						if ("ASSET_ADDITION_NO2" == columnName){
							$("#txtAdditionNo2").val(columnValue);
							continue;
							}
						if ("AED_ID" == columnName){
							$("#cmbAedCode").combobox('setValue', columnValue);//使用房间
							continue;
							}
						//edit begin by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
						if ("DETAILED_USAGE" == columnName){
							$("#txtDetailedUsage").val(columnValue);
							continue;
							}
						//edit end by 李宇 2015年10月29日13:48:26 详细用途支持手输  HRPASSETDEVJAVA-1671
						var certificate_date = '';
						if ("CERTIFICATE_DUE_DATE" == columnName){
							certificate_date = columnValue;
							if (certificate_date == null || certificate_date == undefined
									|| certificate_date == "") {
								$("#timeCertificateDueDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeCertificateDueDate").datetimepicker({
									value : dateFormatterYMD(certificate_date)
								});
						    }
						continue;
						}
						if ("ASSET_TYPE_CODE" == columnName){
							$("#hd_asset_type_code").val(columnValue);
							continue;
							}
						if ("BUILDING_NO" == columnName){
							$("#txtBuilding").val(columnValue);
							continue;
							}
						if ("FLOOR_NO" == columnName){
							$("#txtFloor").val(columnValue);
							continue;
							}
						if ("WARD_NAME" == columnName){
							$("#txtWard").val(columnValue);
							continue;
							}
						var photo_path = "";
						if ("PHOTO_PATH" == columnName){
							photo_path = columnValue;
							$("#hd_photo_path").val(photo_path);
							if (photo_path != null && photo_path != undefined && photo_path != "") {
								$('#imgPath_window').attr("src",
										"../../../AttachView/" + photo_path + "&zc=" + new Date());
								$('#imgPath').attr("src",
										"../../../AttachView/" + photo_path + "&zc=" + new Date());
								$('#imgPath_window').attr("alt", "图片未找到");
							} else {
								$('#imgPath_window').attr("src", "");
								$('#imgPath').attr("src", "");
								$('#imgPath_window').attr("alt", "未上传图片");
							}
							continue;
							}
						var acct_indicator = "";
						if ("ACCT_INDICATOR" == columnName){
							acct_indicator = columnValue;
							if (acct_indicator == 1 && !isEditAssetInfo) {//edit by 李宇 2016年2月1日09:25:05 HRPASSETDEVJAVA-1819 如果有资产信息修改权限则可修改
								disEditBtn();
							} else {
								enEditBtn();
							}
							continue;
							}
						if ("SALVAGE_RATIO" == columnName){				
							$("#txtSalvageRatio").numberbox('setValue', columnValue);
							continue;
							}
						if ("DEPRECIATION_METHOD_ID" == columnName){				
							$("#cmbDepreciationMethod").combobox('setValue', columnValue);
							continue;
							}
						if ("DEPRECIATION_MONTHS" == columnName){				
							$("#txtDepreciationMonths").numberbox('setValue', columnValue);
							continue;
						}
						if ("REMAINING_TOTAL" == columnName){				
							$("#txtRemainingTotal").numberbox('setValue', columnValue);
							continue;
							}				
						var depreciation_date = "";
						if ("DEPRECIATION_DATE" == columnName){				
							depreciation_date = columnValue;
							if (depreciation_date == null || depreciation_date == undefined || depreciation_date == "") {
								$("#timeDepreciationDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeDepreciationDate").datetimepicker({
									value : dateFormatterYMD(depreciation_date)
								});
							}
							continue;
							}					
						if ("DEPRECIATION_METHOD_ID2" == columnName){				
							$("#cmbDepreciationMethod2").combobox('setValue', columnValue);
							continue;
							}	
						if ("DEPRECIATION_MONTHS2" == columnName){				
							$("#txtDepreciationMonths2").numberbox('setValue', columnValue);
							continue;
							}	
						if ("REMAINING_TOTAL2" == columnName){				
							$("#txtRemainingTotal2").numberbox('setValue', columnValue);
							continue;
							}
						var depreciation_date2 = "";
						if ("DEPRECIATION_DATE2" == columnName){				
							depreciation_date2 = columnValue;
							if (depreciation_date2 == null || depreciation_date2 == undefined || depreciation_date2 == "") {
								$("#timeDepreciationDate2").datetimepicker({
									value : ""
								});
							} else {
								$("#timeDepreciationDate2").datetimepicker({
									value : dateFormatterYMD(depreciation_date2)
								});
							}
							continue;
						}
						//edit begin zhaoweijuan 2015年1月27日14:34:45 HRPASSETDEVJAVA-1044
						//下拨金额
						if ("FUND_AMOUNT_1" == columnName) {
							if (!(columnValue == null || columnValue == undefined || columnValue == "")) {
								$("#txtFundAmount1").numberbox('setValue', columnValue);
							}
							continue;
						}
						//自筹金额
						if ("FUND_AMOUNT_2" == columnName) {
							if (!(columnValue == null || columnValue == undefined || columnValue == "")) {
								$("#txtFundAmount2").numberbox('setValue', columnValue);
							}
							continue;
						}
						//应用许可证
						if ("APP_LICENCE" == columnName) {
							$("#txtAppLicence").val(columnValue);
							continue;
						}
						//发证日期
						if ("APP_DATE" == columnName) {
							if (columnValue == null || columnValue == undefined || columnValue == "") {
								$("#timeAppDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeAppDate").datetimepicker({
									value : dateFormatterYMD(columnValue)
								});
							}
							continue;
						}
						//有效期
						if ("APP_INVALID_DATE" == columnName) {
							if (columnValue == null || columnValue == undefined || columnValue == "") {
								$("#timeAppInvalidDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeAppInvalidDate").datetimepicker({
									value : dateFormatterYMD(columnValue)
								});
							}
							continue;
						}
						//配置许可证
						if ("SETUP_LICENCE" == columnName) {
							$("#txtSetupLicence").val(columnValue);
							continue;
						}
						//发证日期
						if ("SETUP_DATE" == columnName) {
							if (columnValue == null || columnValue == undefined || columnValue == "") {
								$("#timeSetupDate").datetimepicker({
									value : ""
								});
							} else {
								$("#timeSetupDate").datetimepicker({
									value : dateFormatterYMD(columnValue)
								});
							}
							continue;
						}
						//经费来源
						if ("FUND_SOURCE" == columnName){
							if(columnValue){
								$("#cmbFundSource").combobox('setValues', columnValue.split(","));
							}							
							continue;
						}
						//发票号
						if ("INVOICE_NO" == columnName) {
							$("#txtInvoiceNo").val(columnValue);
							continue;
						}
						//发票代码
						if ("INVOICE_CODE" == columnName) {
							$("#txtInvoiceCodeDetail").val(columnValue);
							continue;
						}
						//使用年限
						if ("USE_YEARS" == columnName) {
							$("#txtUseYears").numberbox('setValue', columnValue);
							continue;
						}
						//edit end zhaoweijuan 2015年1月27日14:34:45 HRPASSETDEVJAVA-1044
						//edit begin 李文康 增加资产区域 2015年3月30日17:21:36 HRPASSETDEVJAVA-1188
						//资产区域
						if ("ASSET_AREA" == columnName){
							$("#cmbAssetArea").combobox('setValue', columnValue);
							continue;
						}						
						//edit end 李文康 增加资产区域  2015年3月30日17:21:39 HRPASSETDEVJAVA-1188
						//edit begin zhaoweijuan 2015年4月2日20:03:27 HRPASSETDEVJAVA-1186
						if ("DEAL_ENGINEER" == columnName){
							$("#cmbDealEngineer").combobox('setValue', columnValue);
							continue;
						}
						//edit end zhaoweijuan 2015年4月2日20:03:27 HRPASSETDEVJAVA-1186
						if ("REPAIR_FLAG" == columnName){//edit by 吴宇飞 2015年6月4日17:24:00 HRPASSETDEVJAVA-1372
							$("#cmbRepairFlag").combobox('setValue', columnValue);
							continue;
						}
						if ("IS_IMPORT_ASSET" == columnName){
							$("input[name='rdIsImportAsset']:radio[value='"+columnValue+"']").attr('checked','true');
							continue;
						}
						
						//EDIT ADD END LIDU 2016年3月12日14:46:19 
						//HRPASSETDEVJAVA-1851增加入库类别
						if ("IMPORT_TYPE" === columnName){							
							$("#cmbImpType").combobox('setValue', columnValue);
							continue;
						}
						//EDIT ADD END LIDU 2016年3月12日14:52:29
						//EDIT ADD END LIDU 2016年3月12日14:46:19 
						//HRPASSETDEVJAVA-1849增加安装位置
						if ("INSTALL_LOCATION" === columnName){
                            if(isUseAdressDict=='1') {
                                $("#cmbInstallLocation").combobox('setText',columnValue);
                            }else{
                                $("#txtInstallLocation").val(columnValue);
                            }
							continue;
						}
						//EDIT ADD END LIDU 2016年3月12日14:52:29 
						//EDIT ADD END LIDU 2016年3月12日14:46:19 
						//HRPASSETDEVJAVA-1850增加维保说明
						if ("MAINTENANCE_INFO" === columnName){							
							$("#txtMaintenaceInfo").val(columnValue);
							continue;
						}
						//EDIT ADD END LIDU 2016年3月12日14:52:29 
						//是否有直接经济效益
						if ("IS_ECONOMIC_BENEFIT" == columnName){
							$("#cmbIsEconomicBenefit").combobox('setValue', columnValue);
							continue;
						}
						//edit begin by 李宇 2016年4月20日13:50:51 增加品牌字段值维护 HRPASSETDEVJAVA-1905
						if ("ASSET_BRAND" == columnName){
							$("#txtAssetBrand").val(columnValue);
							continue;
						}
						//edit end by 李宇 2016年4月20日13:50:51 增加品牌字段值维护 HRPASSETDEVJAVA-1905
						if ("ARCHIVE_LOCATION" == columnName){
							$("#txtArchiveLocation").val(columnValue);
							continue;
						}
					}
				}
			},
			error : function(data) {
				ajaxError(data, '错误提示');
			}
	 })
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1043
* 描述:调用本页面时，应在父页面自写关闭函数doCloseWindow()，
* 作者:邓文斌
* 日期:2015年1月23日 上午11:59:20
* edit by zhaoweijuan 2015年3月13日13:42:22 HRPASSETDEVJAVA-1144
* </pre>
 */
function cancelAdd(refreshFlag) {
	window.parent.doCloseWindow(refreshFlag);
	$("#addform").form('clear');
}


/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1621
* 描述:删除图片
* 作者:齐晓冬
* 日期:2015年9月17日17:19:50
* </pre>
 */
function doDeletePic() {
	var selectRow = $('#dgPicList').datagrid('getSelected');
	var pic_path = selectRow.ATTACHMENT_URL;
	var attachment_id = selectRow.ATTACHMENT_ID;
	var attach_id = selectRow.ATTACH_ID;
	var attach_config_id = selectRow.ATTACH_CONFIG_ID;
	var obj = {
//			"attachment_url":pic_path,
			"attachId":attach_id,
			"attachment_id":attachment_id
//			"attachConfigId":attach_config_id
	}
	$.messager.confirm('温馨提示', '您确定要进行删除操作吗？', function(r) {
		if (r) {
			$.ajax({
				type : "POST",
				url : electronicAction + "doDeletePic",
				dataType : 'json',
				data : obj,
				success : function(data) {
					if (data.success) {
						$.messager.alert('温馨提示', "删除成功！", 'info');
						$('#window_picture').window('close');
						$('#dgPicList').datagrid('load');
						//edit begin 2015年11月26日16:21:55 删除主图 HRPASSETDEVJAVA-1724
						if(data.message==1){
							$('#hd_photo_path').val("");
							$('#imgPath_window').attr("src","");
							$('#imgPath_window').attr("alt", "图片已删除！");
						}
					} else {
						$.messager.alert('温馨提示', "删除失败！", 'error');
					}
					//edit end 2015年11月26日16:21:55 删除主图 HRPASSETDEVJAVA-1724
				},
				error : function(data) {
					ajaxError(data, "error");
				}
			});
		}
	});
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:打开附属设备新增窗口
* 作者:李文康
* 日期:2015年10月9日 下午2:33:26
* </pre>
 */
function doAddAssetPart(sign) {
	clearAssetPartForm();
	document.getElementById("checkRadio").checked = true;
	document.getElementById("checkRadio").style.display = "";
	document.getElementById("lblAdd").style.display = "";
	$("#txtImportAmount").numberbox('enable');
	//edit by wangke HRPDRTESTJAVA-8359 2017/8/28 14:44:12
	if(sign==1){
	$('#assetPartWindow').window({   
		iconCls : 'icon-add'
	});

	$("#assetPartWindow").window("open");
	}
}

function doCancelPart() {
	$("#window_part").window('close');
}

/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:修改附属设备信息
* 作者:李文康
* 日期:2015年10月9日 下午2:47:42
* </pre>
 */
function doEditAssetPart() {
	clearAssetPartForm();
	var selectedRow = $("#dgAssetBasicPart").datagrid("getSelected");
	if (selectedRow == undefined || selectedRow == null || selectedRow == "") {
		$.messager.alert("温馨提示", "请选择一条附属设备记录进行修改！", "info");
		return;
	}
	$("#txtAssetPartName").val(selectedRow.PART_ASSET_NAME);//附属设备名称	
	$("#txtAssetPartSpec").val(selectedRow.PART_SPEC);//规格
	$("#txtAssetPartType").val(selectedRow.PART_TYPE);//型号
	$("#txtAssetPartPrice").numberbox("setValue", selectedRow.PART_PRICE == "" ?0.00:selectedRow.PART_PRICE);//单价
	//edit start by suihaochuan 2017年1月13日14:14:40
	//HRPASSETDEVJAVA-2142 资产入库处理和资产信息维护增加“出厂编号”和“安装位置”的维护，并在资产信息维护模块资产信息查看时展示
	$("#txtPartSeqNo").val(selectedRow.PART_SEQ_NO);
	$("#txtPartInstallLocation").val(selectedRow.PART_INSTALL_LOCATION);
	//edit end by suihaochuan
	$("#txtAssetPartMemo").val(selectedRow.PART_MEMO);
	//edit begin by 李宇 2016年6月21日11:41:45 回填附属设备打印入库单相关字段值
	$("#txtUnitsName").val(selectedRow.UNITS_NAME);
	$("#txtImportAmount").numberbox('setValue','1');
	$("#txtImportAmount").numberbox('disable');
	$("#txtManufacturerName").val(selectedRow.MANUFACTURER_NAME);
	$("#txtSupplierInfoName").val(selectedRow.SUPPLIER_INFO_NAME);
	$("#txtAssignee").val(selectedRow.ASSIGNEE);
	$("#txtReceiver").val(selectedRow.RECEIVER);
	$("#hidden_part_id").val(selectedRow.PART_ID);
	$("#cmbImportType").combobox('setValue',selectedRow.IMPORT_TYPE);
	var partImportDate = selectedRow.IMPORT_DATE;
	if (partImportDate == null || partImportDate == undefined || partImportDate == "") {
		$("#dateImportDate").datetimepicker({
			value : ""
		});
	} else {
		$("#dateImportDate").datetimepicker({
			value : dateFormatterYMD(partImportDate)
		});
	}
	var partInvoiceDate = selectedRow.INVOICE_DATE;
	if (partInvoiceDate == null || partInvoiceDate == undefined || partInvoiceDate == "") {
		$("#dateInvoiceDate").datetimepicker({
			value : ""
		});
	} else {
		$("#dateInvoiceDate").datetimepicker({
			value : dateFormatterYMD(partInvoiceDate)
		});
	}
	var dateProductionDate = selectedRow.PRODUCTION_DATE;
	if (dateProductionDate == null || dateProductionDate == undefined || dateProductionDate == "") {
		$("#dateProductionDate").datetimepicker({
			value : ""
		});
	} else {
		$("#dateProductionDate").datetimepicker({
			value : dateFormatterYMD(dateProductionDate)
		});
	}
	$("#txtPartbrand").val(selectedRow.PART_BRAND);
	//edit end by 田博 2017年8月11日11:53:45 增加品牌和出厂日期字段
	$("#txtPartCountrName").val(selectedRow.COUNTR_NAME);
	$("#txtPartContarctNo").val(selectedRow.CONTARCT_NO);
	$("#txtPartInvoiceNo").val(selectedRow.INVOICE_NO);
	//edit end by 李宇 2016年6月21日11:41:45 回填附属设备打印入库单相关字段值
	$("#hidden_option").val("EDIT");//修改附属设备时赋为“EDIT”	
	document.getElementById("checkRadio").style.display = "none";
	document.getElementById("lblAdd").style.display = "none";
	document.getElementById("checkRadio").checked = false;
	$('#assetPartWindow').window({   
		iconCls : 'icon-edit'
	});
	$("#assetPartWindow").window("open");
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:保存附属设备信息
* 作者:李文康
* 日期:2015年10月9日 下午3:21:45
* </pre>
 */
function doSaveAssetPart() {
    var assetPartName = $("#txtAssetPartName").val();//附属设备名称
	var assetPartSpec = $("#txtAssetPartSpec").val();//规格
	var assetPartType = $("#txtAssetPartType").val();//型号
	var assetPartPrice = $("#txtAssetPartPrice").numberbox("getValue");//单价
	if(assetPartPrice == "" || assetPartPrice == null || assetPartPrice == undefined){
		assetPartPrice = 0;
	}
	//edit start by suihaochuan 2017-1-13 10:38:28
	//HRPASSETDEVJAVA-2142 资产入库处理和资产信息维护增加“出厂编号”和“安装位置”的维护，并在资产信息维护模块资产信息查看时展示
	var partSeqNo = $("#txtPartSeqNo").val();
	if (getByteLen(partSeqNo) > 50) {
		$.messager.alert('温馨提示', "出厂编号不能超过100个字符！", 'info');
		return;
	}
	var partInstallLocation = $("#txtPartInstallLocation").val();
	if (getByteLen(partInstallLocation) > 100) {
		$.messager.alert('温馨提示', "安装位置不能超过100个字符！", 'info');
		return;
	}
	//edit end by suihaochuan
	var assetPartMemo = $("#txtAssetPartMemo").val();//备注	
	var partId = $("#hidden_part_id").val();//附属设备id
	var hidden_option = $("#hidden_option").val();
	var assetId = $("#hd_SM_ID").val();//资产ID	
	//edit begin by 李宇 2016年6月21日11:41:45 获取附属设备打印入库单相关字段值
	var unitsName = $("#txtUnitsName").val();//单位名称
	var importAmount = $("#txtImportAmount").numberbox("getValue");//数量
	if(importAmount == "" || importAmount == null || importAmount == undefined){
		importAmount = 1;
	}
	var manufacturerName = $("#txtManufacturerName").val();//生产厂家
	var supplierInfoName = $("#txtSupplierInfoName").val();//供应单位
	var assignee = $("#txtAssignee").val();//经办人
	var receiver = $("#txtReceiver").val();//接收人
	var importType = $("#cmbImportType").combobox("getValue");//入库方式
	var invoiceNo = $("#txtPartInvoiceNo").val();//发票号
	var importDate = document.getElementById("dateImportDate").value;//入库日期
	var invoiceDate = document.getElementById("dateInvoiceDate").value;//发票日期
	var partContarctNo = $("#txtPartContarctNo").val();//合同号
	var partCountrName = $("#txtPartCountrName").val();//国别
	//edit end by 李宇 2016年6月21日11:41:45 获取附属设备打印入库单相关字段值
	var dateProductionDate = document.getElementById("dateProductionDate").value;//出厂日期
	var txtPartbrand =$("#txtPartbrand").val();//品牌
	//edit by tianbo 2017年8月11日11:53:45 增加品牌和出厂日期字段
	if (assetPartName == undefined || assetPartName == null
			|| assetPartName == "") {
		$.messager.alert("温馨提示", "附属设备名称不能为空", "info");
		return;
	}
	if (getByteLen(assetPartName) > 100) {
		$.messager.alert('温馨提示', "附属设备名称长度最长为100个字符！", 'info');
		return;
	}
	if (getByteLen(assetPartSpec) > 50) {
		$.messager.alert('温馨提示', "规格长度最长为50个字符！", 'info');
		return;
	}
	if (getByteLen(assetPartType) > 50) {
		$.messager.alert('温馨提示', "型号长度最长为50个字符！", 'info');
		return;
	}
	if (getByteLen(assetPartMemo) > 200) {
		$.messager.alert('温馨提示', "备注长度最长为200个字符！", 'info');
		return;
	}
	//edit end by 李宇 2016年6月21日11:41:45 校验附属设备打印入库单相关字段值
	if (getByteLen(partContarctNo) > 40) {
		$.messager.alert('温馨提示', "合同号长度最长为40个字符！", 'info');
		return;
	}
	if (getByteLen(partCountrName) > 40) {
		$.messager.alert('温馨提示', "国别长度最长为40个字符！", 'info');
		return;
	}
	if (getByteLen(unitsName) > 40) {
		$.messager.alert('温馨提示', "单位长度最长为40个字符！", 'info');
		return;
	}
	if (getByteLen(manufacturerName) > 200) {
		$.messager.alert('温馨提示', "生产厂家长度最长为200个字符！", 'info');
		return;
	}
	if (getByteLen(supplierInfoName) > 200) {
		$.messager.alert('温馨提示', "供货单位长度最长为200个字符！", 'info');
		return;
	}
	if (getByteLen(assignee) > 40) {
		$.messager.alert('温馨提示', "经办人长度最长为40个字符！", 'info');
		return;
	}
	if (getByteLen(receiver) > 40) {
		$.messager.alert('温馨提示', "接收人长度最长为40个字符！", 'info');
		return;
	}
	if (getByteLen(invoiceNo) > 40) {
		$.messager.alert('温馨提示', "发票号长度最长为40个字符！", 'info');
		return;
	}
	if (getByteLen(txtPartbrand) > 100) {
		$.messager.alert('温馨提示', "品牌长度最长为100个字符！", 'info');
		return;
	}
	//edit end by 李宇 2016年6月21日11:41:45 校验附属设备打印入库单相关字段值
	var selectedRow = $("#dgAssetBasicPart").datagrid("getSelected");
	if(assetId == undefined || assetId == null || assetId == ""){
		if(hidden_option == "EDIT"){
			var index = $("#dgAssetBasicPart").datagrid("getRowIndex", selectedRow);
			$('#dgAssetBasicPart').datagrid('updateRow',{
				index: index,
				row: {
					PART_ASSET_NAME : assetPartName,
					PART_SPEC : assetPartSpec,
					PART_TYPE : assetPartType,
					PART_AMOUNT : 1,
					PART_PRICE : assetPartPrice,
					//edit start by suihaochuan 2017年1月13日10:44:46
					//HRPASSETDEVJAVA-2142 资产入库处理和资产信息维护增加“出厂编号”和“安装位置”的维护，并在资产信息维护模块资产信息查看时展示
					PART_SEQ_NO : partSeqNo,
					PART_INSTALL_LOCATION : partInstallLocation,
					//edit end by suihaochuan
					PART_MEMO : assetPartMemo,
					UNITS_NAME : unitsName,
					MANUFACTURER_NAME : manufacturerName,
					SUPPLIER_INFO_NAME : supplierInfoName,
					ASSIGNEE : assignee,
					RECEIVER : receiver,
					IMPORT_TYPE : importType,
					INVOICE_NO : invoiceNo,
					IMPORT_DATE : importDate,
					INVOICE_DATE : invoiceDate,
					COUNTR_NAME : partCountrName,
					CONTARCT_NO : partContarctNo,
					PRODUCTION_DATE : dateProductionDate,
					PART_BRAND : txtPartbrand
				}
			});
		}else{			
			for(var i=0; i< importAmount;i++){
				$('#dgAssetBasicPart').datagrid('appendRow', {			
					PART_ASSET_NAME : assetPartName,
					PART_SPEC : assetPartSpec,
					PART_TYPE : assetPartType,
					PART_AMOUNT : 1,
					PART_PRICE : assetPartPrice,
					//edit start by suihaochuan 2017年1月13日10:44:46
					//HRPASSETDEVJAVA-2142 资产入库处理和资产信息维护增加“出厂编号”和“安装位置”的维护，并在资产信息维护模块资产信息查看时展示
					PART_SEQ_NO : partSeqNo,
					PART_INSTALL_LOCATION : partInstallLocation,
					//edit end by suihaochuan
					PART_MEMO : assetPartMemo,
					UNITS_NAME : unitsName,
					MANUFACTURER_NAME : manufacturerName,
					SUPPLIER_INFO_NAME : supplierInfoName,
					ASSIGNEE : assignee,
					RECEIVER : receiver,
					IMPORT_TYPE : importType,
					INVOICE_NO : invoiceNo,
					IMPORT_DATE : importDate,
					INVOICE_DATE : invoiceDate,
					COUNTR_NAME : partCountrName,
					CONTARCT_NO : partContarctNo,
					PRODUCTION_DATE  :  dateProductionDate,
					PART_BRAND  :  txtPartbrand
				});
			}
			clearAssetPartForm();
		}	
	}else{
		var saveInfo ={
				PART_ASSET_NAME : assetPartName,
				PART_SPEC : assetPartSpec,
				PART_TYPE : assetPartType,
				PART_AMOUNT : importAmount,
				PART_PRICE : assetPartPrice,
				//edit start by suihaochuan 2017年1月13日10:44:46
				//HRPASSETDEVJAVA-2142 资产入库处理和资产信息维护增加“出厂编号”和“安装位置”的维护，并在资产信息维护模块资产信息查看时展示
				PART_SEQ_NO : partSeqNo,
				PART_INSTALL_LOCATION : partInstallLocation,
				//edit end by suihaochuan
				PART_MEMO : assetPartMemo,
				UNITS_NAME : unitsName,
				MANUFACTURER_NAME : manufacturerName,
				SUPPLIER_INFO_NAME : supplierInfoName,
				ASSIGNEE : assignee,
				RECEIVER : receiver,
				IMPORT_TYPE : importType,
				INVOICE_NO : invoiceNo,
				IMPORT_DATE : importDate,
				INVOICE_DATE : invoiceDate,
				COUNTR_NAME : partCountrName,
				CONTARCT_NO : partContarctNo,
				PRODUCTION_DATE  :  dateProductionDate,
				PART_BRAND  :  txtPartbrand
		}
		var obj = {
				"saveInfo" : JSON.stringify(saveInfo),
				"partId" : partId,
				"assetId" : assetId
			};
			$.messager.progress({
				text : "正在保存，请稍后……"
			});
			$.ajax({
				type : "POST",
				url : action + "doSaveAssetPart",
				dataType : 'json',
				data : obj,
				success : function(json) {
					$.messager.progress('close');
					if (json.success) {
						$.messager.alert('温馨提示', json.message, 'info');
						doQueryAssetPart();
					} else {
						$.messager.alert('温馨提示', json.message, 'error');
						return;
					}
				},
				error : function(data) {
					ajaxError(data, '温馨提示');
					return;
				}
			});
	}
	if ($('#checkRadio').attr("checked") != "checked") {
		$("#assetPartWindow").window("close");
	}else{
		clearAssetPartForm();
	}
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1654
* 描述:清空form操作
* 作者:李文康
* 日期:2015年10月15日 下午5:11:41
* </pre>
 */
function clearAssetPartForm(){
	$("#DetailForm").form("clear");
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:取消添加明细
* 作者:李文康
* 日期:2015年10月9日 下午6:18:15
* </pre>
 */
function doCancelAssetPart() {
	$("#assetPartWindow").window("close");
}
/**
 * 
* <pre>
* 任务:HRPASSETDEVJAVA-1646
* 描述:删除附属设备信息
* 作者:李文康
* 日期:2015年10月10日 上午10:53:02
* </pre>
 */
function doDeleteAssetPart() {
	var selectRow = $("#dgAssetBasicPart").datagrid("getSelected");
	if (selectRow == undefined || selectRow == null || selectRow == "") {
		$.messager.alert("温馨提示", setReplaceContrastData("请选择一条附属设备记录进行删除！"), "info");
		return;
	}
	var partId = selectRow.PART_ID;
	var index = $("#dgAssetBasicPart").datagrid("getRowIndex", selectRow);
	if(partId == undefined || partId == null || partId == ""){
		$.messager.confirm('温馨提示', "您确定要删除该附属设备？", function (r) {
	        if (r) {    		        	
	        	$("#dgAssetBasicPart").datagrid('deleteRow', index);
	        }
		}); 
	}else{
		$.messager.confirm('温馨提示', "您确定要删除该附属设备？", function (r) {
	        if (r) {
	    		$.messager.progress({
	    			text : "正在删除，请稍后……"
	    		});
	    		$.ajax({
	    			type : "POST",
	    			url : action + "doDeleteAssetPart",
	    			dataType : 'json',
	    			data : {
	    				"partId" : partId
	    			},
	    			success : function(json) {
	    				$.messager.progress('close');
	    				if (json.success) {
	    					$.messager.alert('温馨提示', json.message, 'info');
	    					doQueryAssetPart();
	    				} else {
	    					$.messager.alert('温馨提示', json.message, 'error');
	    				}
	    			},
	    			error : function(data) {
	    				ajaxError(data, '温馨提示');
	    			}
	    		});        		        	
	        }
		});   
	}
}
/**
 * 
 * <pre>
 * 任务：HRPASSETDEVJAVA-1988
 * 描述：打印附属设备入库单
 * 作者：李宇
 * 时间：2016年6月21日下午7:35:58
 * @param asset_import_id
 * returnType：void
 * </pre>
 */
function doImportPrint(){
	var selectRow = $("#dgAssetBasicPart").datagrid("getSelected");
	if(selectRow == null || selectRow == "" || selectRow == undefined){
		$.messager.alert('温馨提示','请选择需要打印的记录！','info');
		return;
	}
	var part_id = selectRow.PART_ID;
	var loginInfo = getLoginInfo();
	var assetReportPrefix;
	if(assetReportPrefix == undefined){
		assetReportPrefix = getReportUrlPrefix('ASSET');
	}
	var deptCode=loginInfo.DEPT_CODE;
	var reportName = "fssbrk.cpt";
	var src = assetReportPrefix + 'zcrk/' + reportName + "&part_id="
			+part_id + "&USERID="
			+loginInfo.USER_ID+"&deptCode="+deptCode+"&__bypagesize__=false";
	src = finalEncode(src);
	$("#part_import_print").attr("src",src);
	$("#window_part_import_print").window("open");
}

function quantityFormatter(value, row, index) {
	if (value != undefined) {
		// 如果包含格式化的样式，则特殊处理--适用于合计
		var tempValue = value;
		if ((value.toString()).indexOf('F') > -1) {
			var realValue = value.toString();
			value = realValue.substring(realValue.indexOf('F') + 1,
					realValue.length);
		}
		value = (value == null || value == "null" || value == "0" || value == 0) ? "0.00"
				: value;
		value = (Math.round(value * 100) / 100).toFixed(2);
		value = formatMoneyType(value, "Q");
		if ((tempValue.toString()).indexOf('F') > -1) {
			return '<div style ="text-align:right;height:auto;font-weight:bold">'
					+ value + '</div>'
		} else {
			return '<div style="text-align:right;height:auto;">' + value
					+ '</div>';
		}
	}
}
//add by wangxiani 2017年3月2日14:04:44
//HRPASSETDEVJAVA-2176  资产信息维护可维护多个经费来源
//单击经费来源网格行 
function onClickFundSourceRow(index, data) {
	if (endEditing()) {
		$('#dgFundSource').datagrid('selectRow', index).datagrid('beginEdit',
				index);
		editIndex = index;
		// 为经费金额绑定事件
		var edFundPrice = $('#dgFundSource').datagrid('getEditor', {
			index : editIndex,
			field : 'FUND_PRICE'
		});
		var edSciId = $('#dgFundSource').datagrid('getEditor', {
			index : editIndex,
			field : 'SCI_NAME'
		});
		//初始化经费项目下拉选择
		 // 清空
        $(edSciId).combobox('clear'); 
        // 重载
        $(edSciId).combobox('reload',comboBoxActionUrl + "getComboBox");
		// 金额获得焦点
		edFundPrice.target.focus();
	}
}
/**
 * 校验数据并结束编辑
 */
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#dgFundSource').datagrid('validateRow', editIndex)) {
		// 编辑该行占比数据
		var updateRow = $('#dgFundSource').datagrid("getRows")[editIndex];
		var edFundPrice = $('#dgFundSource').datagrid('getEditor', {
			index : editIndex,
			field : 'FUND_PRICE'
		});
		if(edFundPrice){
			var newPrice = $(edFundPrice.target).val();
			if(parseFloat(newPrice)<=0){
				$.messager.alert("温馨提示","经费来源明细金额必须大于0！", "info");
				return false;
			}else{
				updateRow.FUND_PRICE = newPrice;
			}
		}
		var edSciId = $('#dgFundSource').datagrid('getEditor', {
			index : editIndex,
			field : 'SCI_NAME'
		});
		var sciId;
		var sciName;
		if(edSciId){
			var sciId = $(edSciId.target).combobox('getValue');
			var sciName = $(edSciId.target).combobox('getText');
		}
		var price = $('#txtPrice').numberbox('getValue').trim();
		// 结束编辑该行数据
		$('#dgFundSource').datagrid('endEdit', editIndex);
		if(sciId && !isNaN(sciId)){
			updateRow.SCI_ID = sciId;
		}
		if(sciName){
			updateRow.SCI_NAME = sciName;
		}
		updateOneRowProportion(price,updateRow,editIndex);
		$('#dgFundSource').datagrid('refreshRow', editIndex);
		editIndex = undefined;
		return true;
	} else {
		$.messager.alert("温馨提示","经费来源详细信息未维护完成！", "info");
		return false;
	}
}
//更新经费来源数据行的“所占比例”
function updateOneRowProportion(price,rowInfo,rowIndex){
	rowInfo.PRICE = price;	
	$('#dgFundSource').datagrid('updateRow',{
		index: rowIndex,
		row: rowInfo
	});
}
//检查经费金额有效性
function checkFundSourceRow(price){
	var fundRows = $('#dgFundSource').datagrid('getRows');
	var sumSourceMoney = 0;	
	if(fundRows.length>0){
		for(var i=0;i<fundRows.length;i++){
			if(!fundRows[i].FUND_PRICE){			
					$.messager.alert("温馨提示","请填写经费来源明细的金额!", "info");
					return false;			
			}
			if(parseFloat(fundRows[i].FUND_PRICE) == 0){
				$.messager.alert("温馨提示","经费来源明细金额不能为0！", "info");
				return false;
			}
			sumSourceMoney += parseFloat(fundRows[i].FUND_PRICE);
		}   
		if(!(sumSourceMoney.toFixed(2) == price)){
			$.messager.alert("温馨提示","请检查您的经费来源金额之和是否等于资产总额！", "info");
			return false;
		}
	}	
	return true;
}
//检查国别是否为下拉数据
function CheckCombogridData(file) {
	var value = $(file).combogrid("getValue");
	var text = $(file).combogrid('getText');
	if(!value){
		return true;
	}
	 
	if(value == text){
		return false;
	}
	return true;
}
/**
 * 
 * <pre>
 * 任务： 
 * 描述：打开新增关联合同
 * 作者：wangke
 * 时间：2018年05月18日下午4:33:00
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function addRelation(){
	$("#window_th_cpms").window('open');
	$('#dgThCmpsDetail').datagrid({
		fit : true,
		rownumbers : true,
		singleSelect : false,
		toolbar: '#thCpmsDetailTool',
		url : action + "DoQueryCpms", 
		frozenColumns : [ [ {
			field : 'ck',
			checkbox : true
		} ] ],
		pagination : true,
		columns : createThColumns()
	});
}
/**
 * 
 * <pre>
 * 任务： 
 * 描述：创建关联合同的列
 * 作者：wangke
 * 时间：2018年05月18日下午4:33:00
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function createThColumns() {
	var columns = [ [ {
		field : "CPMS_ID",
		title : "合同ID",
		width : 100,
		hidden : true
	}, {
		field : "CPMS_NO",
		title : "合同编号",
		width : 130,
		align : 'center',
		sortable : true 
	} ,{
		field : "CPMS_NAME",
		title : "合同名称",
		width : 130,
		align : 'left',
		halign : "center",
		sortable : true
	},  {   
		field : "CP_TYPE_DICT",
		title : "合同类型",
		width : 100,
		align : 'left',
		halign : "center"
	}, {
		field : "CPMS_TOTAL_AMOUNT",
		title : "总金额",
		width : 100,
		align : 'left',
		halign : "center",
		formatter : amountFormatter
	}, {
		field : "CPMS_START_DATE",
		title : "开始日期",
		width : 130,
		align : 'center',
		halign : "center",
		sortable : true 
	}, {
		field : "CPMS_END_DATE",
		title : "结束日期",
		width : 130,
		align : 'center',
		halign : "center",
		sortable : true 
		}
	   ] ];
	return columns;
}

/**
 * 
 * <pre>
 * 任务： 
 * 描述：保存选择的关联合同
 * 作者：wangke
 * 时间：2018年05月18日下午4:33:00
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function doSaveCpms(){
	 var assetId = $("#hd_SM_ID").val();//资产ID	
	 var selectedDeatailRows = $("#dgThCmpsDetail").datagrid('getSelections');
	 if(!(selectedDeatailRows.length > 0)){
		 $.messager.alert('温馨提示', "请选择要关联的合同！", 'info');
			return;
	 }
	 var cmps_data = $("#dgRelation").datagrid("getRows");
	if(assetId == undefined || assetId == null || assetId == ""){
		 for (var i = 0; i < selectedDeatailRows.length; i++) {
				for (var j = 0; j < cmps_data.length; j++) {
					if(cmps_data[j].CPMS_ID == selectedDeatailRows[i].CPMS_ID){
						$('#dgRelation').datagrid('deleteRow',j);
						break;
					}
				}
				$('#dgRelation').datagrid('appendRow',
						selectedDeatailRows[i]);
		 }
		 $('#window_th_cpms').window('close');
	}else{
		var cpmsId ="";
		var issame = 0;
		 for (var i = 0; i < selectedDeatailRows.length; i++) {
			    issame = 0;
				for (var j = 0; j < cmps_data.length; j++) {
					if(cmps_data[j].CPMS_ID == selectedDeatailRows[i].CPMS_ID){
						issame = 1;
						break;
					}
				}
				 if(issame ==0 ){
					 if(cpmsId == undefined || cpmsId == null || cpmsId == ""){
							cpmsId += selectedDeatailRows[i]['CPMS_ID'];
						}else{
							cpmsId += "|";
							cpmsId += selectedDeatailRows[i]['CPMS_ID'];
						}
				 }
		 }
		if(cpmsId == undefined || cpmsId == null || cpmsId == ""){
			$.messager.alert('温馨提示', "所选择的合同已经关联！", 'info');
			return;
		}
		var data = {
				"cpmsId" :cpmsId,
				"assetId" : assetId
		};
		$.messager.progress({
			text : "正在保存，请稍后……"
		});
		$.ajax({
			type : "POST",
			url : action + "SaveAssetCpms",
			data : data,
			dataType : "json",
			success : function(data) {
				$.messager.progress('close');
				$.messager.alert('温馨提示', "保存成功！", 'info');
				$('#window_th_cpms').window('close');
				doQueryAssetVsCpms();
				//console.log(json);
				/*if (json.success) {
					$.messager.alert('温馨提示', json.message, 'info');
					doQueryAssetVsCpms();
				} else {
					$.messager.alert('温馨提示', json.message, 'error');
					return;
				}*/
			},
			error : function(data) {
				ajaxError(data, "保存信息失败");
			}
		});
	}
}

/**
 * 
 * <pre>
 * 任务： 
 * 描述：删除关联合同
 * 作者：wangke
 * 时间：2018年05月18日下午4:33:00
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function delRelation() {
	var selectRow = $("#dgRelation").datagrid("getSelected");
	if (selectRow == undefined || selectRow == null || selectRow == "") {
		$.messager.alert("温馨提示", setReplaceContrastData("请选择一条关联合同进行删除！"), "info");
		return;
	}
	var cpms_vs_asset_id = selectRow.CPMS_VS_ASSET_ID;
	var index = $("#dgRelation").datagrid("getRowIndex", selectRow);
	if(cpms_vs_asset_id == undefined || cpms_vs_asset_id == null || cpms_vs_asset_id == ""){
		$.messager.confirm('温馨提示', "您确定要删除该关联合同吗？", function (r) {
	        if (r) {    		        	
	        	$("#dgRelation").datagrid('deleteRow', index);
	        }
		}); 
	}else{
		$.messager.confirm('温馨提示', "您确定要删除该关联合同吗？", function (r) {
	        if (r) {
	    		$.messager.progress({
	    			text : "正在删除，请稍后……"
	    		});
	    		$.ajax({
	    			type : "POST",
	    			url : action + "doDeleteRelationCpms",
	    			dataType : 'json',
	    			data : {
	    				"cpms_vs_asset_id" : cpms_vs_asset_id
	    			},
	    			success : function(json) {
	    				$.messager.progress('close');
	    				if (json.success) {
	    					$.messager.alert('温馨提示', json.message, 'info');
	    					doQueryAssetVsCpms();
	    				} else {
	    					$.messager.alert('温馨提示', json.message, 'error');
	    				}
	    			},
	    			error : function(data) {
	    				ajaxError(data, '温馨提示');
	    			}
	    		});        		        	
	        }
		});   
	}
}
/**
 * 
 * <pre>
 * 任务： 
 * 描述：查询关联的合同
 * 作者：wangke
 * 时间：2018年05月18日下午4:33:00
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function doQueryCpms(){
	var cpmsName = $("#txtCpmsName").val().replace(/^\s+/, "").replace(/\s+$/, "");
	var cpmsNo = $("#txtCpmsNo").val().replace(/^\s+/, "").replace(/\s+$/, "");//资产编码
 
	var obj = {
		"cpmsName" :cpmsName,
		"cpm_no":cpmsNo 
	};
	$('#dgThCmpsDetail').datagrid({
		url : action + "DoQueryCpms",
		queryParams : obj,
		pageNumber :1
	});
}
/**
 * 
 * <pre>
 * 任务： 
 * 描述：关闭窗口
 * 作者：wangke
 * 时间：2018年05月18日下午4:33:00
 * @returns {Array}
 * returnType：Array
 * </pre>
 */
function  docancelCpms(){
	$('#window_th_cpms').window('close');
}