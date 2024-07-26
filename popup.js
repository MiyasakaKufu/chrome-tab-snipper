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
        var markdown = `- ${groupTitle.textContent}\n\t-\n`;
        tabs.forEach(function(tab) {
          var tabTitle = tab.title || tab.url;
          markdown += `\t- [${tabTitle}](${tab.url})\n`;
        });
        navigator.clipboard.writeText(markdown);
      });

      // markdown clip に追加
      markdownClip += `- ${groupTitle.textContent}\n\t-\n`;
      
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
        markdownClip += `\t- [${tabTitle}](${tab.url})\n`;

        // raw url clip に追加
        rawUrlClip += `- ${tab.url}\n`;
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
      var markdown = `- ${groupTitle.textContent}\n\t-\n`;
      tabs.forEach(function(tab) {
        var tabTitle = tab.title || tab.url;
        markdown += `\t- [${tabTitle}](${tab.url})\n`;
      });
      navigator.clipboard.writeText(markdown);
    });

    // markdown clip に追加
    markdownClip += `- ${groupTitle.textContent}\n\t-\n`;

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
      markdownClip += `\t- [${tabTitle}](${tab.url})\n`;

      // raw url clip に追加
      rawUrlClip += `- ${tab.url}\n`;
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
