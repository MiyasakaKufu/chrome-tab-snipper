// MARK: - デフォルトのコピー形式

var defaultGroupTitleFormat = '# {groupTitle}\n\t-';
var defaultTabTItleAndUrlFormat = '\t* [{tabTitle}]({tabUrl})';
var defaultTabUrlFormt = '* {tabUrl}';

// MARK: - ユーザー定義のコピー形式

var userDefinedGroupTitleFormat = defaultGroupTitleFormat;
var userDefinedTabTItleAndUrlFormat = defaultTabTItleAndUrlFormat;
var userDefinedTabUrlFormt = defaultTabUrlFormt;

// MARK: - ユーザー定義のコピー形式から実際にコピーする文字列を生成する関数
// - groupTitle: タブグループのタイトル

function generateMarkdownClipFromGroupTitle(groupTitle) {
  var markdownClip = userDefinedGroupTitleFormat.replace('{groupTitle}', groupTitle) + '\n';
  return markdownClip;
}

// - tabTitleAndUrl: タブのタイトルと URL

function generateMarkdownClipFromTabInfo(tabTitle, tabUrl) {
  var markdownClip = userDefinedTabTItleAndUrlFormat.replace('{tabTitle}', tabTitle).replace('{tabUrl}', tabUrl) + '\n';
  return markdownClip;
}

// - tabUrl: タブの URL

function generateMarkdownClipFromTabUrl(tabUrl) {
  var markdownClip = userDefinedTabUrlFormt.replace('{tabUrl}', tabUrl) + '\n';
  return markdownClip;
}

// MARK: - タブグループのタイトルとタブのタイトルと URL 文字列に変換する関数

function generateMarkdownClip(tabGroupTitle, tabs) {
  var markdownClip = '';
  markdownClip += generateMarkdownClipFromGroupTitle(tabGroupTitle);
  tabs.forEach(function(tab) {
    var tabTitle = tab.title || tab.url;
    var tabUrl = tab.url;
    markdownClip += generateMarkdownClipFromTabInfo(tabTitle, tabUrl);
  });
  return markdownClip;
}

// MARK: - イベントリスナー
// 全てのタブグループを取得し、その中のタブのURLを表示する
chrome.tabGroups.query({}, function(tabGroups) {
  var markdownClip = '';
  var rawUrlClip = '';
  
  tabGroups.forEach(function(tabGroup) {
    // タブグループに属するタブを取得
    chrome.tabs.query({groupId: tabGroup.id}, function(tabs) {
      // セクションを作成
      var tabGroupSection = document.createElement('section');
      tabGroupSection.className = 'tab-group';
      document.body.appendChild(tabGroupSection);

      // グループタイトルとボタンを格納するセクションを作成
      var tabGroupHeaderSection = document.createElement('section');
      tabGroupHeaderSection.className = 'tab-group-header';
      tabGroupSection.appendChild(tabGroupHeaderSection);

      // タブグループのタイトルを表示する
      var groupTitle = document.createElement('h2');
      groupTitle.textContent = tabGroup.title;
      tabGroupHeaderSection.appendChild(groupTitle);

      // この h2 要素をクリップボードにコピーするボタンを表示する
      var copyButton = document.createElement('button');
      copyButton.textContent = 'Copy Markdown';
      tabGroupHeaderSection.appendChild(copyButton);
      copyButton.addEventListener('click', function() {

        // タブグループのタイトルとタブのタイトルと URL をクリップボードにコピーする
        var markdown = generateMarkdownClip(tabGroup.groupTitle, tabs);
        navigator.clipboard.writeText(markdown);
      });

      // markdown clip に追加
      markdownClip += generateMarkdownClipFromGroupTitle(tabGroup.title);
      
      // タブグループに属するタブを表示する
      var ul = document.createElement('ul');
      tabGroupSection.appendChild(ul);
      tabs.forEach(function(tab) {
        var groupItem = document.createElement('li');
        
        // タブのアイコンを表示する
        var img = document.createElement('img');
        img.src = tab.favIconUrl;
        groupItem.append(img);
        
        // タブのタイトルを表示する
        var tabTitle = tab.title || tab.url;
        groupItem.append("\t" + tabTitle);
        ul.appendChild(groupItem);
        
        // markdown clip に追加
        markdownClip += generateMarkdownClipFromTabInfo(tabTitle, tab.url);

        // raw url clip に追加
        rawUrlClip += generateMarkdownClipFromTabUrl(tab.url);
      });
    });
  });

  // タブグループに属さないタブを取得
  chrome.tabs.query({groupId: -1}, function(tabs) {
    var groupTitle = document.createElement('h2');
    groupTitle.textContent = 'その他';
    document.body.appendChild(groupTitle);

    // この h2 要素をクリップボードにコピーするボタンを表示する
    var copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Markdown';
    document.body.appendChild(copyButton);

    // この h2 要素をクリップボードにコピーするボタンを表示する
    copyButton.addEventListener('click', function() {

      var markdown = generateMarkdownClip(groupTitle, tabs);
      navigator.clipboard.writeText(markdown);
    });

    // markdown clip に追加
    markdownClip += generateMarkdownClipFromGroupTitle(groupTitle.textContent);

    // タブグループに属するタブを表示する
    var ul = document.createElement('ul');
    document.body.appendChild(ul);
    tabs.forEach(function(tab) {
      var groupItem = document.createElement('li');

      // タブのアイコンを表示する
      var img = document.createElement('img');
      img.src = tab.favIconUrl;
      groupItem.append(img);

      // タブのタイトルを表示する
      var tabTitle = tab.title || tab.url;
      groupItem.append("\t" + tabTitle);
      ul.appendChild(groupItem);

      // markdown clip に追加
      markdownClip += generateMarkdownClipFromTabInfo(tabTitle, tab.url);

      // raw url clip に追加
      rawUrlClip += generateMarkdownClipFromTabUrl(tab.url);
    });
  });

  // copy-markdown-button クリック時に markdownClip をクリップボードにコピーする
  document.getElementById('copy-markdown-button').addEventListener('click', function() {
    navigator.clipboard.writeText(markdownClip);
  });

  // copy-url-only-button クリック時に rawUrlClip をクリップボードにコピーする
  document.getElementById('copy-url-only-button').addEventListener('click', function() {
    navigator.clipboard.writeText(rawUrlClip);
  });

});
