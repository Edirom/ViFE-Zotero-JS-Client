ViFEZotero = (function () {

    retrieveZoteroBib: function(url, containerId) {
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function () { 
          if (oReq.readyState != 4 || oReq.status != 200)
            return;
           
          parseLib(JSON.parse(oReq.responseText), containerId);
          
        };
        oReq.open("GET", url);
        oReq.send();
    };
    
    parseLib: function(lib, containerId) {
        var cont = document.getElementById(containerId);
        //remove Loader
        cont.innerHTML = "";
        
        var year = "";
        lib.forEach(function(item) {
            
            //check year
            var date = new Date(item.data.date);
            if(year != date.getFullYear()) {
                year = date.getFullYear();
                var count = getItemsPerYear(lib, year);
                var sep = createYearSeperator(year, count);
                cont.appendChild(sep);
            }
                
            var entry = parseItem(item);
            var div = document.createElement('div');
            div.setAttribute('class', 'zoteroItem');
            div.innerHTML = entry;
            cont.appendChild(div);
        });
    };
    
    createYearSeperator: function(year, count) {
        var div = document.createElement('div');
        div.setAttribute('class', 'zoteroYearSep');
        div.innerHTML = '<i>' + year + '</i> <span class="zoteroYearCount">(' + count + ')';
        return div;
    };
    
    getItemsPerYear: function(lib, year) {
        
        var count = 0;
        lib.forEach(function(item) {
            var date = new Date(item.data.date);
            if(year == date.getFullYear())
                count++;
        });
        
        return count;
    };
    
    parseItem: function(item) {
        
        var returnString = "";
        
        var itemType = item.data.itemType;
        if(itemType == "bookSection") {
            returnString = parseTitle(item);
            returnString = returnString + parseAuthors(item);
            returnString = returnString + parseBookTitle(item);
            returnString = returnString + parsePages(item);
            returnString = returnString + parsePublisher(item);
            returnString = returnString + parsePlace(item);
            returnString = returnString + parseDate(item);
            
        }else if(itemType == "presentation") {
            returnString = parseTitle(item);
            returnString = returnString + parseAuthors(item);
            returnString = returnString + parseMeetingName(item);
            returnString = returnString + parsePlace(item);
            returnString = returnString + parseDate(item);
            
        }else if(itemType == "journalArticle") {
            returnString = parseTitle(item);
            returnString = returnString + parseAuthors(item);
            returnString = returnString + parseBookTitle(item);
            returnString = returnString + parsePublicationTitle(item);
            returnString = returnString + parseVolumeIssue(item);
            returnString = returnString + parsePages(item);
            returnString = returnString + parseDate(item);
        
        }else {
            returnString = 'Item type "' + itemType + '" not supported, yet.';
        }    
        
        returnString = returnString + ' <a href="' + item.links.alternate.href + '" target="_blank">(Zotero&nbsp;<span class="zoteroExternalLink">&#8599;</span>)</a>';
        
        return returnString;
    };
    
    parseTitle: function(item) {
        if(item.data.title)
            return "<b>" + item.data.title + ".</b>";
        
        return "";
    };
    
    parseAuthors: function(item) {
    
        var ret = "";
        if(item.data.creators.length > 0) {
          for(var i = 0; i < item.data.creators.length; i++) {
            var creator = item.data.creators[i];
            if(i == 0)
              ret = " ";
            else if(i == item.data.creators.length - 1)
              ret = ret + " und ";
            else if(i > 0)
              ret = ret + ", ";
            if(creator.creatorType = "author")
              ret = ret + creator.firstName + " " + creator.lastName;
          }
          
          ret = ret + ".";
        }
        
        return ret;
    };
    
    parseBookTitle: function(item) {
        if(item.data.bookTitle)
            return " In <i>" + item.data.bookTitle + ".</i>";
        
        return "";
    };
    
    parsePages: function(item) {
        if(item.data.pages)
            return " Seiten " + item.data.pages + ".";
        
        return "";
    };
    
    parsePublisher: function(item) {
        if(item.data.publisher)
            return " " + item.data.publisher + ",";
        
        return "";
    };
    
    parsePublicationTitle: function(item) {
        if(item.data.publicationTitle)
            return " <i>" + item.data.publicationTitle + "</i>,";
        
        return "";
    };
    
    parseVolumeIssue: function(item) {
        if(item.data.volume)
            return " " + item.data.volume + parseIssue(item) + ".";
        
        return "";
    };
    
    parseIssue: function(item) {
        if(item.data.issue)
            return "(" + item.data.issue + ")";
        
        return "";
    };
    
    parseMeetingName: function(item) {
        if(item.data.meetingName)
            return " Vorgetragen bei: " + item.data.meetingName + ".";
        
        return "";
    };
    
    parsePlace: function(item) {
        if(item.data.place)
            return " " + item.data.place + ",";
        
        return "";
    };
    
    parseDate: function(item) {
        if(item.data.date)
            // Todo: verschiedene Formate parsen
            return " " + item.data.date + ".";
        
        return "";
    };

    return {
        init: function (url) {
            retrieveZoteroBib(url, containerId);
        }
    };

})();

ViFEZotero.init("https://api.zotero.org/groups/304071/items?v=3&format=json&tag=zenmem&sort=date", "zotero");
