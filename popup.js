// MARK: - デフォルトのコピー形式

const defaultGroupTitleFormat = '- {groupTitle}\n\t-';
const defaultTabTitleAndUrlFormat = '\t- [{tabTitle}]({tabUrl})';
const defaultTabUrlFormt = '- {tabUrl}';

// MARK: - ユーザー定義のコピー形式

var userDefinedGroupTitleFormat = defaultGroupTitleFormat;
var userDefinedTabTItleAndUrlFormat = defaultTabTitleAndUrlFormat;
var userDefinedTabUrlFormt = defaultTabUrlFormt;

document.getElementById('setting-content').style.display = 'none';

// ポップアップ画面内で画面を切り替える
// - 切り替え先
//  - タブの一覧を表示する画面（app-content）
//  - 設定画面

// 表示画面の切り替え

// div id="header-content" を取得
const headerContent = document.getElementById('header-content');

// 設定画面へ切り替えるボタンを header-content に追加
const settingButton = document.createElement('button');
settingButton.textContent = 'Setting';
// 設定ボタンを右寄せにする
settingButton.style.float = 'right';
// 設定ボタンをクリックしたときの処理
settingButton.onclick = function() {
  // 設定画面を表示
  document.getElementById('app-content').style.display = 'none';
  document.getElementById('setting-content').style.display = 'block';
  
  // 設定ボタンを非表示
  settingButton.style.display = 'none';
};
headerContent.appendChild(settingButton);
