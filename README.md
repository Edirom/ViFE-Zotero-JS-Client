# ViFE-Zotero-JS-Client

This web client includes a zotero library in a website. See a demo here: http://zenmem.de/confluence/display/ZMEM/Publikationen

## Usage

Include the Javascript and CSS files.

```html
<script type="text/javascript" src="/path/to/vife-zotero.js"></script>
<link rel="stylesheet" type="text/css" href="/path/to/vife-zotero.css" />
```

Create a container with an ID.

```html
<div id="zotero"></div>
```

Call the `init()` function of the `ViFEZotero` client, when the page finished loading. The parameters for the `init()` function are: 1st Zotero API URL of the library and 2nd the ID of the container. The client expects the items chronological order, by now.

```html
<script type="text/javascript">
<!-- 
	window.addEventListener("load", function(event) {
		ViFEZotero.init("https://api.zotero.org/groups/304071/items?v=3&format=json&tag=zenmem&sort=date", "zotero");
	});
-->
</script>
```

## Licence
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)