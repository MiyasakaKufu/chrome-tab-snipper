// div id="setting-content" を取得
const settingContent = document.getElementById('setting-content');

// 設定画面から戻るボタンを追加
const backButton = document.createElement('button');
backButton.textContent = 'Back';
// 設定ボタンを右寄せにする
backButton.style.float = 'right';
backButton.onclick = function() {
  // 設定画面を非表示
  settingContent.style.display = 'none';
  document.getElementById('app-content').style.display = 'block';
  
  // 設定ボタンを表示
  settingButton.style.display = 'block';

  // app-content を更新
  const appContent = document.getElementById('app-content');
  appContent.innerHTML = '';
  createAppContent();
};
settingContent.appendChild(backButton);

// 設定画面のタイトルを追加
const settingTitle = document.createElement('h2');
settingTitle.textContent = 'Setting';
settingContent.appendChild(settingTitle);

// MARK: - 設定項目

// MARK: - Commons

// テキストエリアの内容を可視化する関数
function defaultVisualize(text) {
  return text
    .replace(/ /g, '<span class="space">·</span>')
    .replace(/\t/g, '<span class="tab">--\></span>')
    .replace(/\n/g, '<span class="newline">¶</span>\n');
}

function visualizeGroupTitleFormat(text) {
  return text
  .replace(/\{(.*?)\}/g, function(match, p1) {
    if (p1 === 'groupTitle') {
      return `<span class="highlight">${match}</span>`;
    } else {
      return `<span class="error">${match}</span>`;
    }
  });
}

function visualizeTabInfoFormat(text) {
  return text
  .replace(/\{(.*?)\}/g, function(match, p1) {
    if (p1 === 'tabTitle' || p1 === 'tabUrl') {
      return `<span class="highlight">${match}</span>`;
    } else {
      return `<span class="error">${match}</span>`;
    }
  });
}

function visualizeTabUrlFormat(text) {
  return text
  .replace(/\{(.*?)\}/g, function(match, p1) {
    if (p1 === 'tabUrl') {
      return `<span class="highlight">${match}</span>`;
    } else {
      return `<span class="error">${match}</span>`;
    }
  });
}

// MARK: - Visualizations

function updateGroupTitleVisualization(textarea, visualizationElement) {
  visualizationElement.innerHTML = visualizeGroupTitleFormat(defaultVisualize(textarea.value));
}

function updateTabInfoVisualization(textarea, visualizationElement) {
  visualizationElement.innerHTML = visualizeTabInfoFormat(defaultVisualize(textarea.value));
}

function updateTabUrlVisualization(textarea, visualizationElement) {
  visualizationElement.innerHTML = visualizeTabUrlFormat(defaultVisualize(textarea.value));
}

// MARK: - Group Copy Format
//   - グループのタイトル, タブのタイトルと URL のコピー形式

const groupCopyFormat = document.createElement('section');
groupCopyFormat.className = 'setting-item';
settingContent.appendChild(groupCopyFormat);

const groupCopyFormatTitle = document.createElement('h3');
groupCopyFormatTitle.textContent = 'Group Copy Format';
groupCopyFormat.appendChild(groupCopyFormatTitle);

// グループのタイトルのコピー形式
const groupTitleFormatLabel = document.createElement('label');
groupTitleFormatLabel.textContent = 'Group Title Format';
groupCopyFormat.appendChild(groupTitleFormatLabel);

const groupTitleFormat = document.createElement('textarea');
groupTitleFormat.placeholder = 'Group Title Format';
groupTitleFormat.value = userDefinedGroupTitleFormat;
groupTitleFormat.onchange = function() {
  userDefinedGroupTitleFormat = groupTitleFormat.value;
  updateGroupTitleVisualization(groupTitleFormat, groupTitleFormatVisualization);
};
groupCopyFormat.appendChild(groupTitleFormat);

const groupTitleFormatVisualization = document.createElement('pre');
groupTitleFormatVisualization.className = 'no-select';
groupCopyFormat.appendChild(groupTitleFormatVisualization);
updateGroupTitleVisualization(groupTitleFormat, groupTitleFormatVisualization);

// タブのタイトルと URL のコピー形式
const tabTitleAndUrlFormatLabel = document.createElement('label');
tabTitleAndUrlFormatLabel.textContent = 'Tab Title and URL Format';
groupCopyFormat.appendChild(tabTitleAndUrlFormatLabel);

const tabTitleAndUrlFormat = document.createElement('textarea');
tabTitleAndUrlFormat.placeholder = 'Tab Title and URL Format';
tabTitleAndUrlFormat.value = userDefinedTabTItleAndUrlFormat;
groupCopyFormat.onchange = function() {
  userDefinedTabTItleAndUrlFormat = tabTitleAndUrlFormat.value;
  updateTabInfoVisualization(tabTitleAndUrlFormat, tabTitleAndUrlFormatVisualization);
};
groupCopyFormat.appendChild(tabTitleAndUrlFormat);

const tabTitleAndUrlFormatVisualization = document.createElement('pre');
tabTitleAndUrlFormatVisualization.className = 'no-select';
groupCopyFormat.appendChild(tabTitleAndUrlFormatVisualization);
updateTabInfoVisualization(tabTitleAndUrlFormat, tabTitleAndUrlFormatVisualization);

// MARK: - URL Copy Format

const urlCopyFormat = document.createElement('section');
urlCopyFormat.className = 'setting-item';
settingContent.appendChild(urlCopyFormat);

const urlCopyFormatTitle = document.createElement('h3');
urlCopyFormatTitle.textContent = 'URL Copy Format';
urlCopyFormat.appendChild(urlCopyFormatTitle);

// タブの URL のコピー形式
const tabUrlFormat = document.createElement('textarea');
tabUrlFormat.placeholder = 'Tab URL Format';
tabUrlFormat.value = userDefinedTabUrlFormt;
urlCopyFormat.onchange = function() {
  userDefinedTabUrlFormt = tabUrlFormat.value;
  updateTabUrlVisualization(tabUrlFormat, tabUrlFormatVisualization);
};
urlCopyFormat.appendChild(tabUrlFormat);

const tabUrlFormatVisualization = document.createElement('pre');
tabUrlFormatVisualization.className = 'no-select';
urlCopyFormat.appendChild(tabUrlFormatVisualization);
updateTabUrlVisualization(tabUrlFormat, tabUrlFormatVisualization);

// MARK: - Reset Button

const resetButton = document.createElement('button');
resetButton.textContent = 'Reset';

// リセットボタンのスタイル
resetButton.style.float = 'right';
resetButton.style.color = 'red';

resetButton.onclick = function() {
  groupTitleFormat.value = defaultGroupTitleFormat;
  tabTitleAndUrlFormat.value = defaultTabTitleAndUrlFormat;
  tabUrlFormat.value = defaultTabUrlFormt;
  
  userDefinedGroupTitleFormat = defaultGroupTitleFormat;
  userDefinedTabTItleAndUrlFormat = defaultTabTitleAndUrlFormat;
  userDefinedTabUrlFormt = defaultTabUrlFormt;
  
  updateGroupTitleVisualization(groupTitleFormat, groupTitleFormatVisualization);
  updateTabInfoVisualization(tabTitleAndUrlFormat, tabTitleAndUrlFormatVisualization);
  updateTabUrlVisualization(tabUrlFormat, tabUrlFormatVisualization);
};

settingContent.appendChild(resetButton);
