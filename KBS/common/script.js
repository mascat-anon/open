/**
 * タイトルなどのテキストに自動で長体をかけるJS
 * @constructor　Choootype
 * @param {String} sel - エフェクトを掛けたい場所のセレクターを指定する。
 * @param {Object} opt - オプションのオブジェクト。
 * @param {Number} opt.min - 長体の最長値を設定する。
 * @param {Number} opt.delay - ウインドウリサイズ終了確認のための待機時間。
 * @param {Number} minAspect - 長体の最小値をを設定します。
 * @param {Object} tgt - 変更する複数のオブジェクト
 * @param {Object} box - 変更する1つのオブジェクト（親要素）
 * @param {Object} span - boxの中身にspanタグを追加したオブジェクト（子要素）
 * @param {Number} boxWidth - boxの要素の幅
 * @param {Object} spanWidth - spanの要素の幅
 * @param {Number} aspecgt - 親要素と子要素のの比率。長体の値
 *
 * Choootype 1.2
 *
 * Yoshiaki Matsumura
 * ejworks corporation
 * Copyright 2021, MIT License
 *
 */
var Choootype = function(div = ".auto_narrow", opt = {}) {
	// 可読性のため0.6倍くらいが望ましいが、最小値を固定してしまうと文字が切れてしまう可能性あり。
	// 初期値は0（長体の限度なし）
	const minAspect = opt.min || 0;
	let timeoutID = 0;
	let delay = opt.delay || 500;

	// 長体をかける
	function __setChoootype(div) {
		const tgt = document.querySelectorAll(div);
		tgt.forEach((box) => {
			// 元のオブジェクトの幅を取得
			const boxWidth = box.offsetWidth;
			// 長体を掛けるためのオブジェクトを生成
			let span = document.createElement("span");
			span.innerHTML = box.textContent;
			span.style.whiteSpace = "nowrap";
			span.className = "js-addChoootype";
			// 中のオブジェクトがはみ出るのではみ出た部分を非表示にする
			box.style.overflow = "hidden";
			box.innerHTML = "";
			box.appendChild(span);
			const spanWidth = span.offsetWidth;
			// 元のオブジェクトより中のオブジェクトが大きいとき、その比率で中のオブジェクトの幅を縮める
			if (boxWidth < spanWidth) {
				let aspect = boxWidth / spanWidth;
				if (aspect < minAspect) aspect = minAspect;
				span.style.transform = "scaleX(" + aspect + ")";
				span.style.display = "inline-block";
				span.style.transformOrigin = "top left";
			}
		});
	}
	__setChoootype(div);
};
Choootype();


function startMarquee(element) {
	const speed = 1.8; // Adjust this value to change the scrolling speed
	const containerWidth = element.offsetWidth;
	const contentWidth = element.querySelector('span').offsetWidth;
	let position = containerWidth;

	function move() {
		position -= speed;
		element.querySelector('span').style.transform = `translateX(${position}px)`;
		if (position < -contentWidth) {
			position = containerWidth;
		}
		requestAnimationFrame(move);
	}
	move();
}
//こっからデータ
//進捗
var progressBar = document.getElementById("progress-bar");
var percent = document.getElementById("percent");
let progress = 0;

function updateProgress() {
	progress = 100;

	// 100%になったら
	if (progress = 100) {
		document.getElementById("loading-screen").classList.add('loaded');
	}
}
//休日テーブル
var HolidayTable = [
	[202411, "元日"],
	[202418, "成人の日"],
	[2024211, "建国記念の日"],
	[2024212, "休日"],
	[2024223, "天皇誕生日"],
	[2024320, "春分の日"],
	[2024429, "昭和の日"],
	[202453, "憲法記念日"],
	[202454, "みどりの日"],
	[202455, "こどもの日"],
	[202456, "休日"],
	[2024715, "海の日"],
	[2024811, "山の日"],
	[2024812, "休日"],
	[2024916, "敬老の日"],
	[2024922, "秋分の日"],
	[2024923, "休日"],
	[20241014, "スポーツの日"],
	[2024113, "文化の日"],
	[2024114, "休日"],
	[20241123, "勤労感謝の日"],
	[20241228, "年始運行"],
	[20241229, "年始運行"],
	[20241230, "年始運行"],
	[20241231, "年始運行"],
	[202511, "年始運行"],
	[202512, "年始運行"], 
	[202513, "年始運行"], 
	[202514, "年始運行"], 
	[202515, "年始運行"],
	[2025211, "建国記念の日"],
	[2025223, "天皇誕生日"],
	[2025224, "休日"],
	[2025320, "春分の日"],
	[2025429, "昭和の日"],
	[202553, "憲法記念日"],
	[202554, "みどりの日"],
	[202555, "こどもの日"],
	[202556, "休日"],
	[2025721, "海の日"],
	[2025811, "山の日"],
	[2025915, "敬老の日"],
	[2025923, "秋分の日"],
	[20251013, "スポーツの日"],
	[2025113, "文化の日"],
	[20251123, "勤労感謝の日"],
	[20251124, "休日"]
];

var NowTimeSource = "";
var NowYear = "";
var NowMonth = "";
var NowDay = "";
var NowWeek = "";
var NowHour = "";
var NowMin = "";
var NowSec = "";
var Holidayflag;

function showClock() {
	NowTimeSource = new Date();
	NowYear = NowTimeSource.getFullYear();
	NowMonth = NowTimeSource.getMonth() + 1;
	NowDay = NowTimeSource.getDate();
	yobi = new Array("Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat");
	NowHour = NowTimeSource.getHours();
	NowMin = NowTimeSource.getMinutes();
	NowSec = NowTimeSource.getSeconds();
	var checkToday = Number("" + NowYear + NowMonth + NowDay); // 文字列から数値への変換
	Holidayflag = false; // ループの前に初期化
	for (var i = 0; i < HolidayTable.length; i++) {
		if (checkToday === HolidayTable[i][0]) { // 条件式修正
			Holidayflag = true;
			break;
		}
	}
	if (Holidayflag) { //休日判定
		NowWeek = 0;
	} else {
		NowWeek = NowTimeSource.getDay();
	}

	if (NowHour < 10) NowHour = "0" + NowHour;
	if (NowMin < 10) NowMin = "0" + NowMin;
	if (NowSec < 10) NowSec = "0" + NowSec;
	var ResetTime = "" + NowHour + NowMin + NowSec;
	if (ResetTime === "000000") { //0時にリセット
		SetTimeTable();
		console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour +
			":" + NowMin + ":" + NowSec + "　ResetTime" + "　日付変更")
	}
}

function showClock2() {
	var nowTime = new Date();
	var nowHour = nowTime.getHours();
	var nowMin = nowTime.getMinutes();
	if (nowMin < 10) nowMin = "0" + nowMin;
	var msg =
		"<span class='' style='font-size: 2.3vmin;' id=''>現在時刻&ensp;</span><br><i>" +
		nowHour + ":" + nowMin + "</i>";
	document.getElementById("NowTime").innerHTML = msg;
	window.setTimeout(function() {
		var msg =
			"<span class='' style='font-size: 2.3vmin;' id=''>現在時刻&ensp;</span><br><i>" +
			nowHour + "<span style='opacity: 0;'>:</span>" + nowMin + "</i>";
		document.getElementById("NowTime").innerHTML = msg;
	}, 1000);
}
//共通仕様
function GetXMLHR(FILE_URL, AFTER_SCRIPT_NAME) {
	var XMLHR = new XMLHttpRequest();
	XMLHR.onreadystatechange = function() {
		if (XMLHR.readyState == 4 && XMLHR.status == 200) {
			var DATA_LIST = XMLHR.responseText;
			var AFTER_SCRIPT = new Function("引数", "return " + AFTER_SCRIPT_NAME +
				"(引数)");
			AFTER_SCRIPT(DATA_LIST);
		}
	}
	XMLHR.open("GET", FILE_URL, true);
	XMLHR.send(null);
}
var ScrollParam_Common = ""; //運行情報なし[0]運行情報あり[1]
var ScrollParam_Force = ""; //強制情報なし[0]あり[1]
var ScrollMessage_Info = "";
var ScrollMessage_Force = "";

function ScrollINFO(DATA_LIST) {
	ScrollMessage_Info = "";
	ScrollMessage_Force = "";
	DATA_LIST = DATA_LIST.replace(/[\n\r]/g, ""); // Ｂ
	var DATA = eval("(" + DATA_LIST + ")");
	for (var i = 0; i < DATA.values.length; i++) {
		if (DATA.values[i][0] == "標準") {
			ScrollParam_Force = 0;
			ScrollMessage_Info += "　" + DATA.values[i][1];
		} else if (DATA.values[i][0] == "強制") {
			ScrollParam_Force = 1;
			ScrollMessage_Force += "　" + DATA.values[i][1];
		}
	}
	console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour + ":" +
		NowMin + ":" + NowSec + "　ScrollINFO" + "　スクロール文章ファイル受信")
}
var TrainInfoTable = new Array();
var ScrollMessage_TrainInfo = "";

function TrainINFO(DATA_LIST) {
	ScrollMessage_TrainInfo = ""; //内容クリア
	var LineName = new Array(); // Ａ
	var Statues = new Array();
	var Paragraph = new Array();

	var Date = new Array();
	var Cause = new Array();
	DATA_LIST = DATA_LIST.replace(/[\n\r]/g, ""); // Ｂ
	var DATA = eval("(" + DATA_LIST + ")"); // Ｃ
	if (DATA.values[0][0] == "None Train Information") {
		ScrollParam_Common = 0; //運行情報なし[0]あり[1]
		console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour +
			":" + NowMin + ":" + NowSec + "　ScrollINFO" + "　運行情報ファイル受信" + "　運行情報なし")
	} else {
		ScrollParam_Common = 1; //運行情報なし[0]あり[1]
		TrainInfoTable = DATA.values;
		for (var i = 0; i < DATA.values.length; i++) {
			LineName[i] = DATA.values[i][0]; // Ｄ
			Statues[i] = DATA.values[i][1];
			Paragraph[i] = DATA.values[i][2];
			Date[i] = DATA.values[i][3];
			Cause[i] = DATA.values[i][4];
			ScrollMessage_TrainInfo += "<sb><sr>【" + Statues[i] + "】 <eb><er>" +
				Paragraph[i] + "　";
		}
		console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour +
			":" + NowMin + ":" + NowSec + "　ScrollINFO" + "　運行情報ファイル受信" + "　運行情報あり")
	}
	SetScroll();
}
var TodayTimeTable = new Array();
var TodayTimeTableMaster = new Array();
//本日のデータをCSVを配列から格納ここから
function CSV_TimeTable(dataArr) {
	var matrix = new Array();
	if (dataArr.match(/\r/)) var row = dataArr.split("\r\n"); // Ａ
	else row = dataArr.split("\n");
	for (i = 0; i < row.length; i++) {
		matrix[i] = new Array(); // Ｂ
		var columnDATA = row[i].split(","); // Ｃ
		var column = 5; //運行,発時(計),系統,行先,摘要,発時(実),着所,着時
		for (var j = 0; j < column; j++) {
			matrix[i][j] = columnDATA[j]; // Ｄ
		}
		matrix[i][5] = columnDATA[1];
		matrix[i][6] = "";
		matrix[i][7] = "";
		matrix[i][8] = "";
		matrix[i][9] = "";
		matrix[i][10] = "";
	}
	let wi = 0;
	let si = 0;
	let hi = 0;
	var data_info_01 = document.getElementById('data_info_01');
	if (Holidayflag) { //休日判定外部ソース
		NowWeek = 0;

		console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour +
			":" + NowMin + ":" + NowSec + "　Holidayflag" + "　祝日判定")

		data_info_01.innerHTML = '（祝日ﾓｰﾄﾞ）';
	} else {
		NowWeek = NowTimeSource.getDay();

		console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour +
			":" + NowMin + ":" + NowSec + "　Holidayflag" + "　通常判定")
		data_info_01.innerHTML = '（通常ﾓｰﾄﾞ）';
	}
	if (NowWeek == 0) { //  Holiday
		for (let i = 0; i < matrix.length; i++) { // 振り分け
			if (matrix[i][0] == '休日') {
				TodayTimeTable[hi] = matrix[i];
				TodayTimeTableMaster[hi] = matrix[i];
				hi++;
			}
		}
	} else if (NowWeek == 6) { //  Saturday
		for (let i = 0; i < matrix.length; i++) { // 振り分け
			if (matrix[i][0] == '土曜') {
				TodayTimeTable[si] = matrix[i];
				TodayTimeTableMaster[si] = matrix[i];
				si++;
			}
		}
	} else { //  Weekday
		for (let i = 0; i < matrix.length; i++) { // 振り分け
			if (matrix[i][0] == '平日') {
				TodayTimeTable[wi] = matrix[i];
				TodayTimeTableMaster[wi] = matrix[i];
				wi++;
			}
		}
	}
	var DaiaCode = new Array("休日ﾀﾞｲﾔ", "平日ﾀﾞｲﾔ", "平日ﾀﾞｲﾔ", "平日ﾀﾞｲﾔ", "平日ﾀﾞｲﾔ",
		"平日ﾀﾞｲﾔ", "土曜ﾀﾞｲﾔ");
	console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour + ":" +
		NowMin + ":" + NowSec + "　DaiaCode" + "　" + DaiaCode[NowWeek])

	var data_info_02 = document.getElementById('data_info_02');
	data_info_02.innerHTML = DaiaCode[NowWeek];
}
var ViaBunData = new Array();
//経由と背景色のデータをCSVを配列から格納ここから
function CSV_ViaBunData(dataArr) {
	var matrix = new Array();
	if (dataArr.match(/\r/)) var row = dataArr.split("\r\n"); // Ａ
	else row = dataArr.split("\n");
	for (i = 0; i < row.length; i++) {
		matrix[i] = new Array(); // Ｂ
		var columnDATA = row[i].split(","); // Ｃ
		var column = 4; //系統行先,経由,カラー1,カラー2
		for (var j = 0; j < column; j++) {
			matrix[i][j] = columnDATA[j]; // Ｄ
		}
	}
	ViaBunData = matrix;
	console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour + ":" +
		NowMin + ":" + NowSec + "　ViaBunData" + "　経由文ファイル受信")

}
var RemarkBunData = new Array();
//備考文のデータをCSVを配列から格納ここから
function CSV_RemarkBunData(dataArr) {
	var matrix = new Array();
	if (dataArr.match(/\r/)) var row = dataArr.split("\r\n"); // Ａ
	else row = dataArr.split("\n");
	for (i = 0; i < row.length; i++) {
		matrix[i] = new Array(); // Ｂ
		var columnDATA = row[i].split(","); // Ｃ
		var column = 3; //系統行先,経由,カラー
		for (var j = 0; j < column; j++) {
			matrix[i][j] = columnDATA[j]; // Ｄ
		}
	}
	RemarkBunData = matrix;
	console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour + ":" +
		NowMin + ":" + NowSec + "　RemarkBunData" + "　備考文ファイル受信")

}
var BusEND = "";
//いまのデータをJSONを配列から格納ここから
function JSON_RealTimeTable(DATA_LIST) {
	NowTimeSource = new Date();
	NowHour = NowTimeSource.getHours();
	NowMin = NowTimeSource.getMinutes();
	if (NowMin < 10) NowMin = "0" + NowMin;
	if (NowHour < 10) NowHour = "0" + NowHour;
	var CheckTime = NowHour + "" + NowMin;
	CheckTime = Number(CheckTime)
	DATA_LIST = DATA_LIST.replace(/[\n\r]/g, ""); // Ｂ
	var BusInformationData = eval("(" + DATA_LIST + ")"); // Ｃ
	RealTimeTable = new Array();
	for (let j = 0; j < TodayTimeTable.length; j++) { //臨時運行のデータは毎度消す
		if (TodayTimeTable[j][0] == "臨時") {
			TodayTimeTable.splice([j], 1);
			j--
		}
	}
	if (BusInformationData.values[0][0] == "DepPlannedTime") { //運行終了判定
		BusEND = "yes";
	} else { //運行,発時(計),系統,行先,摘要,発時(実),着所,着時
		BusEND = "no";
		for (var i = 0; i < BusInformationData.values.length; i++) {
			RealTimeTable[i] = [];
			RealTimeTable[i][0] = "当日"; // Ｄ
			RealTimeTable[i][1] = BusInformationData.values[i][0];
			RealTimeTable[i][2] = BusInformationData.values[i][1];
			RealTimeTable[i][3] = BusInformationData.values[i][2];
			RealTimeTable[i][4] = "";
			RealTimeTable[i][5] = BusInformationData.values[i][3];
			RealTimeTable[i][6] = BusInformationData.values[i][4];
			RealTimeTable[i][7] = BusInformationData.values[i][5];
			RealTimeTable[i][8] = BusInformationData.values[i][6];
			RealTimeTable[i][9] = BusInformationData.values[i][7];
			RealTimeTable[i][10] = BusInformationData.values[i][8];
			//上から振ってくるJSONとマッチング
			for (let j = 0; j < TodayTimeTable.length; j++) {
				R_MatchingSource = RealTimeTable[i][1] + RealTimeTable[i][2] +
					RealTimeTable[i][3];
				T_MatchingSource = TodayTimeTable[j][1] + TodayTimeTable[j][2] +
					TodayTimeTable[j][3];
				if (R_MatchingSource == T_MatchingSource) {
					TodayTimeTable[j][0] = RealTimeTable[i][0];
					TodayTimeTable[j][5] = RealTimeTable[i][5];
					TodayTimeTable[j][6] = RealTimeTable[i][6];
					TodayTimeTable[j][7] = RealTimeTable[i][7];
					TodayTimeTable[j][8] = RealTimeTable[i][8];
					TodayTimeTable[j][9] = RealTimeTable[i][9];
					TodayTimeTable[j][10] = RealTimeTable[i][10];
				}
			}
			if (RealTimeTable[i][1] == ":") { //臨時ダイヤの取得
				TodayTimeTable.unshift(['臨時', '', '', '', '', '', '', '']);
				TodayTimeTable[0][1] = RealTimeTable[i][5];
				TodayTimeTable[0][2] = RealTimeTable[i][2];
				TodayTimeTable[0][3] = RealTimeTable[i][3];
				TodayTimeTable[0][4] = "20";
				TodayTimeTable[0][5] = NowHour + ":" + NowMin;
				TodayTimeTable[0][6] = RealTimeTable[i][6];
				TodayTimeTable[0][7] = RealTimeTable[i][7];
				TodayTimeTable[0][10] = RealTimeTable[i][10];
			}
		}
	}

	for (let j = 0; j < TodayTimeTable.length; j++) { //時間過ぎたら消す
		if (CheckTime > Number(TodayTimeTable[j][5].replace(/[^0-9]/g, ''))) {
			TodayTimeTable.splice([j], 1);
			j--
		}
	}

	//テーブル作成クエリ
	var tableEle = document.getElementById('DaiaTable');
	var clrow = TodayTimeTable.length;
	tableEle.innerHTML = '';
	var tr = document.createElement('tr');
	tr.class = "MonitorRow";
	var thTitle = new Array("運行", "発時(計)", "系統", "行先", "案内", "発時(予)", "到着地",
		"着時(予)", "位置", "順序", "車両");
	for (var j = 0; j < 11; j++) {
		var th = document.createElement('th');
		th.innerHTML = thTitle[j];
		tr.appendChild(th);
	}


	tableEle.appendChild(tr);
	for (var i = 0; i < clrow; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < 11; j++) {
			var td = document.createElement('td');
			td.innerHTML = TodayTimeTable[i][j];
			tr.appendChild(td);
		}

		tableEle.appendChild(tr);
	}
	表示();
	updateProgress(); //進捗３
	setTimeout(表示, 5000);
	console.log("" + NowYear + "/" + NowMonth + "/" + NowDay + "　" + NowHour + ":" +
		NowMin + ":" + NowSec + "　RealTimeTable" + "　バス情報ファイル受信")
}
var DispPattern = 0; //初期0
function 表示() {
	if (stopValue === 'matsudo') {
		document.getElementById('Displayname').innerHTML = "京成バス 松戸駅出発";
	} else if (stopValue === 'nichidai') {
		document.getElementById('Displayname').innerHTML = "京成バス 日大歯科病院出発";
	} else if (stopValue === 'nagareyama') {
		document.getElementById('Displayname').innerHTML = "京成バス 南流山駅出発（松戸方面）";
	}
	for (let j = 0; j < 5; j++) { //初期状態にもどしてく
		document.getElementById('Type' + j).innerHTML = "";
		document.getElementById('TypeBox' + j).style.backgroundColor = "";
		document.getElementById('Time' + j).innerHTML = "";
		document.getElementById('Time' + j).style.color = "";
		document.getElementById('Dist' + j).innerHTML = "";
		document.getElementById('Dist' + j).style.color = "";
		document.getElementById('Delay' + j).innerHTML = "";
		document.getElementById('Delay' + j).style.color = "";
		document.getElementById('Type' + j).classList.remove("blink");
		document.getElementById('Time' + j).classList.remove("blink");
		document.getElementById('Dist' + j).classList.remove("blink");
		document.getElementById('Delay' + j).classList.remove("blink");
	}
	var DispTableCount = 5;
	var MaxDispTableCount = 5;
	var NoneDispTableCount = 0;
	if (TodayTimeTable.length < DispTableCount) {
		DispTableCount = TodayTimeTable.length;
		NoneDispTableCount = MaxDispTableCount - DispTableCount;
		for (let i = 0; i < NoneDispTableCount; i++) { //初期状態にもどしてく
			let j = DispTableCount + i;
			document.getElementById('Type' + j).innerHTML = "";
			document.getElementById('TypeBox' + j).style.backgroundColor = "";
			document.getElementById('Time' + j).innerHTML = "";
			document.getElementById('Time' + j).style.color = "";
			document.getElementById('Dist' + j).innerHTML = "";
			document.getElementById('Dist' + j).style.color = "";
			document.getElementById('Delay' + j).innerHTML = "";
			document.getElementById('Delay' + j).style.color = "";
			document.getElementById("marquee" + j).querySelector('span').innerHTML = ""; //ここを今度解決させる。
			document.getElementById('Type' + j).classList.remove("blink");
			document.getElementById('Time' + j).classList.remove("blink");
			document.getElementById('Dist' + j).classList.remove("blink");
			document.getElementById('Delay' + j).classList.remove("blink");
		}
	}
	for (let i = 0; i < DispTableCount; i++) {
		document.getElementById('Type' + i).innerHTML += TodayTimeTable[i][2];
		var DisplayTime = TodayTimeTable[i][1];
		if (TodayTimeTable[i][1].length < 5) DisplayTime = "&nbsp;&nbsp;" +
			TodayTimeTable[i][1]; //時間が一桁の場合左に空白
		document.getElementById('Time' + i).innerHTML = DisplayTime;
		document.getElementById('Dist' + i).innerHTML = TodayTimeTable[i][3];
		var NowTimeSource = new Date();
		var NowMin = NowTimeSource.getMinutes();
		if (NowMin < 10) NowMin = "0" + NowMin;
		var DepPlannedTime = TodayTimeTable[i][1].replace(/[^0-9]/g, '');
		var DepPredictionTime = TodayTimeTable[i][5].replace(/[^0-9]/g, '');
		var DelayTime = 0;
		if (DepPlannedTime.slice(-2) > DepPredictionTime.slice(-2)) { //遅れ計算
			DelayTime = DepPredictionTime.slice(-2) - DepPlannedTime.slice(-2) + 60;
		} else {
			DelayTime = DepPredictionTime.slice(-2) - DepPlannedTime.slice(-2);
		}
		var DepWill = 0;
		if (NowMin > DepPredictionTime.slice(-2)) { //あと何分で出る？
			DepWill = DepPredictionTime.slice(-2) - NowMin + 60;
		} else {
			DepWill = DepPredictionTime.slice(-2) - NowMin;
		}
		ViaBunData.forEach((index) => {
			if (index[0] == TodayTimeTable[i][2] + TodayTimeTable[i][3]) {
				document.getElementById('Type' + i).innerHTML += "＜" + index[1] + "＞";
				document.getElementById('TypeBox' + i).style.backgroundColor = index[2];
			}
		});
		RemarkBunData.forEach((index) => {
			if (index[0] == TodayTimeTable[i][4]) {
				document.getElementById('Dist' + i).style.color = index[2];
			}
		});

		if (DispPattern == 0) {} else if (DispPattern == 1) {

		} else if (DispPattern == 2) {
			if (TodayTimeTable[i][4] == "0") {
				document.getElementById('Time' + i).innerHTML = "当バス停始発"
				document.getElementById('Time' + i).style.color = '#00FFFF';
			}else if (TodayTimeTable[i][4] == "11") {
				document.getElementById('Time' + i).innerHTML = "最終バス1本前"
				document.getElementById('Time' + i).style.color = '#00ff00';
			}else if (TodayTimeTable[i][4] == "10") {
				document.getElementById('Time' + i).innerHTML = "最終バス"
				document.getElementById('Time' + i).style.color = 'red';
			}
		}

		if (TodayTimeTable[i][0] == "臨時") { //臨時表示
			document.getElementById('Delay' + i).innerHTML = "臨時運行予定";
			document.getElementById('Delay' + i).style.color = '#FF00FF';
			document.getElementById('Time' + i).innerHTML = "時刻未定"
			RemarkBunData.forEach((index) => {
				if (index[0] == TodayTimeTable[i][4]) {
					const marquee = document.getElementById("marquee" + i);
					const spanElement = marquee.querySelector('span');
					if (spanElement.textContent !== index[1]) {
						spanElement.innerHTML = index[1];
						startMarquee(marquee);
					}
				}
			});

		} else if (TodayTimeTable[i][0] == "当日") { //当日データが取れているものだけ吐く
			if (DispPattern == 0) { //表示パターン
				if (DelayTime > 15) {
					document.getElementById('Delay' + i).innerHTML = "到着大幅遅れ";
					document.getElementById('Delay' + i).style.color = 'red';
					document.getElementById('Time' + i).innerHTML = ""
				} else if (DelayTime > 0) {
					document.getElementById('Delay' + i).innerHTML = TodayTimeTable[i][5]+" 出発予定";
					document.getElementById('Delay' + i).style.color = 'Orange';
				} else {
					document.getElementById('Delay' + i).innerHTML = "定刻通り出発";
					document.getElementById('Delay' + i).style.color = '#00ff00';
				}
			} else if (DispPattern == 1) {
				if (DelayTime > 15) {
					document.getElementById('Delay' + i).innerHTML = "到着大幅遅れ";
					document.getElementById('Delay' + i).style.color = 'red';
					document.getElementById('Time' + i).innerHTML = ""
				} else if (DelayTime > 0) {
					document.getElementById('Delay' + i).innerHTML = "出発遅れ 約" + DelayTime + "分";
					document.getElementById('Delay' + i).style.color = 'Orange';
				} else {
					document.getElementById('Delay' + i).innerHTML = "定刻通り出発";
					document.getElementById('Delay' + i).style.color = '#00ff00';
				}
			} else if (DispPattern == 2) {
				if (TodayTimeTable[i][8] == "far") {
					if (DelayTime > 15) {
						document.getElementById('Delay' + i).innerHTML = "出発まで 約" + DepWill + "分";
					} else if (DelayTime > 0) {
						document.getElementById('Delay' + i).innerHTML = "出発まで 約" + DepWill + "分";
					} else {
						document.getElementById('Delay' + i).innerHTML = "出発まで 約" + DepWill + "分";
					}
				} else {
					var position = TodayTimeTable[i][8].slice(9);
					document.getElementById('Delay' + i).innerHTML = position + "つ前のバス停出発";
					document.getElementById('Delay' + i).style.color = '';
				}
			}


			if (TodayTimeTable[i][8] == "far") {
				RemarkBunData.forEach((index) => {
					if (index[0] == TodayTimeTable[i][4]) {
						const marquee = document.getElementById("marquee" + i);
						const spanElement = marquee.querySelector('span');
						if (spanElement.textContent !== index[1]) {
							const After_spanElement = index[1].replace(/（Destination）/g,
									TodayTimeTable[i][3]) + "　　" + TodayTimeTable[i][6] + "には" +
								TodayTimeTable[i][7] + "ごろ到着予定です。";
							if (spanElement.textContent !== After_spanElement) {
								spanElement.innerHTML = After_spanElement;
								startMarquee(marquee);
							}
						}
					}
				});
			} else {
				var position = TodayTimeTable[i][8].slice(9);
				RemarkBunData.forEach((index) => {
					if (index[0] == TodayTimeTable[i][4]) {
						const marquee = document.getElementById("marquee" + i);
						const spanElement = marquee.querySelector('span');
						if (spanElement.textContent !== index[1]) {
							const After_spanElement = "ただいま" + position + "つ前のバス停を出発しました。" + "　　" +
								index[1].replace(/（Destination）/g, TodayTimeTable[i][3]) + "　　" +
								TodayTimeTable[i][6] + "には" + TodayTimeTable[i][7] + "ごろ到着予定です。";
							if (spanElement.textContent !== After_spanElement) {
								spanElement.innerHTML = After_spanElement;
								startMarquee(marquee);
							}
						}
					}
				});
			}
			if (DepWill < 2) { //出発N分切るとだす
				document.getElementById('Delay' + i).innerHTML = "まもなく出発";
				document.getElementById('Delay' + i).style.color = '#FFFF00';
				document.getElementById('Type' + i).classList.add("blink");
				document.getElementById('Time' + i).classList.add("blink");
				document.getElementById('Dist' + i).classList.add("blink");
				document.getElementById('Delay' + i).classList.add("blink");
			}
		} else {
			RemarkBunData.forEach((index) => {
				if (index[0] == TodayTimeTable[i][4]) {
					const marquee = document.getElementById("marquee" + i);
					const spanElement = marquee.querySelector('span');
					if (spanElement.textContent !== index[1]) {
						const After_spanElement = index[1].replace(/（Destination）/g,
							TodayTimeTable[i][3]);
						if (spanElement.textContent !== After_spanElement) {
							spanElement.innerHTML = After_spanElement;
							startMarquee(marquee);
						}
					}
				}
			});
		}
	}
	if (TodayTimeTable.length == 0) {
		if (BusEND == "yes") {
			document.getElementById('Dist0').innerHTML = "運行終了";
			document.getElementById('Dist0').style.color = 'red';
		} else {
			document.getElementById('Type0').innerHTML = "情報要求失敗（自動的に再要求します）";
		}
	}
	if (DispPattern == 0) { //表示パターン
		DispPattern = 1;
	} else if (DispPattern == 1) {
		DispPattern = 2;
	} else if (DispPattern == 2) {
		DispPattern = 0;
	}
	//平体のフィッテング
	Choootype();
}
var ScrollMessage_str = "";
var ScrollMessage_Before = "";


// 詳細開いたら時刻表を作成
function createTimetable(data) {
	var tbody = document.getElementById('TimeTableView');
	tbody.innerHTML = "";
	var timeTable = {};
	// データを整理
	data.forEach(row => {
		var time = row[1].split(':');
		var hour = parseInt(time[0], 10);
		var minute = time[1];
		var line = row[2];
		var destination = row[3].substr(0, 1);
		var color1 = "";
		var color2 = "";
		ViaBunData.forEach((index) => {
			if (index[0] == row[2] + row[3]) {
				color1 = index[2];
				color2 = index[3];
			}
		});
		if (!timeTable[hour]) {
			timeTable[hour] = [];
		}
		timeTable[hour].push({
			minute, line, destination, color1, color2
		});
	});
	for (const hour in timeTable) {
		const row = document.createElement('tr');

		const hourCell = document.createElement('th');
		hourCell.className = 'side01';
		hourCell.textContent = hour;

		const minuteCell = document.createElement('td');
		timeTable[hour].forEach(entry => {
			const div = document.createElement('div');
			div.className = 'tablebox';
			div.style.border = "solid 2px ";
			div.style.borderColor = entry.color1;
			div.style.backgroundColor = entry.color2;
			div.setAttribute('nowrap', '');
			const span1 = document.createElement('span');
			span1.className = 'type';
			span1.textContent = entry.line;
			const br = document.createElement('br');
			const span2 = document.createElement('span');
			span2.className = 'min';
			span2.textContent = entry.minute;
			const br2 = document.createElement('br');
			const span3 = document.createElement('span');
			span3.className = 'distnation';
			span3.textContent = entry.destination;
			div.appendChild(span1);
			div.appendChild(br);
			div.appendChild(span2);
			div.appendChild(br2);
			div.appendChild(span3);
			minuteCell.appendChild(div);

		});
		row.appendChild(hourCell);
		row.appendChild(minuteCell);
		tbody.appendChild(row);
	}
	// 凡例行を作成
	var notedist = "";
	var countMap = {}; // 行き先をカウント
	for (var i = 0; i < data.length; i++) {
		var destination = data[i][3];
		if (countMap[destination] === undefined) {
			countMap[destination] = 1;
		} else {
			countMap[destination]++;
		}
	}
	// 多い順に並べ替え
	var sortedDestinations = [];
	for (var key in countMap) {
		sortedDestinations.push([key, countMap[key]]);
	}
	sortedDestinations.sort(function(a, b) {
		return b[1] - a[1];
	});

	for (var i = 0; i < sortedDestinations.length; i++) {
		notedist += sortedDestinations[i][0].substr(0, 1) + "：" + sortedDestinations[
			i][0] + "　";
	}
	if (sortedDestinations.length == 0) {
		notedist = "本日この路線の運行はありません";
	}
	const noteRow = document.createElement('tr');
	const noteHourCell = document.createElement('th');
	noteHourCell.className = 'side01';
	noteHourCell.textContent = '凡例'; // 空のセル内容
	const noteMinuteCell = document.createElement('td');
	noteMinuteCell.innerHTML = notedist; // 空のセル内容
	noteRow.appendChild(noteHourCell);
	noteRow.appendChild(noteMinuteCell);
	tbody.appendChild(noteRow);

}

function SetScroll() {

	console.log(TodayTimeTable)
	const timerId = setInterval(function() { //表示成功まで繰り返す
		if (ScrollParam_Force == 1) {
			ScrollMessage_str = ScrollMessage_Force;
		} else if (ScrollParam_Common == 0) {
			ScrollMessage_str = ScrollMessage_Info;
		} else if (ScrollParam_Common == 1) {
			ScrollMessage_str = ScrollMessage_TrainInfo;
		}
		if (!ScrollMessage_str == "") {

			clearInterval(timerId)
		}

		var Result_str = ScrollMessage_str.replace(/<sb>/g,
				"<span class='str_blink'>").replace(/<so>/g, "<span class='str_orange'>")
			.replace(/<sr>/g, "<span class='str_red'>").replace(/<sg>/g,
				"<span class='str_green'>").replace(/<eb>/g, "</span>").replace(/<eo>/g,
				"</span>").replace(/<er>/g, "</span>").replace(/<eg>/g, "</span>");
		const marquee = document.getElementById("marquee5");
		const spanElement = marquee.querySelector('span');
		if (ScrollMessage_str !== ScrollMessage_Before) {
			ScrollMessage_Before = ScrollMessage_str;
			spanElement.innerHTML = Result_str;
			//テーブル作成クエリ
			var tableEle = document.getElementById('TraininfoTable');
			var clrow = TrainInfoTable.length;
			tableEle.innerHTML = '';
			var tr = document.createElement('tr');
			tr.class = "MonitorRow";
			var thTitle = new Array("路線", "状況", "内容", "ﾃﾞｰﾀ時刻", "原因");
			for (var j = 0; j < 5; j++) {
				var th = document.createElement('th');
				th.innerHTML = thTitle[j];
				tr.appendChild(th);
			}


			tableEle.appendChild(tr);
			for (var i = 0; i < clrow; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < 5; j++) {
					var td = document.createElement('td');
					td.innerHTML = TrainInfoTable[i][j];
					td.style.textAlign = "left";
					tr.appendChild(td);
				}

				tableEle.appendChild(tr);
			}
			startMarquee(marquee);
		}
	}, 100)
}
document.querySelectorAll('.marquee').forEach(startMarquee);

function toggleModal() {
	createTimetable(TodayTimeTableMaster);
	var modal = document.getElementById('modal-01');
	modal.classList.toggle('open');
}
