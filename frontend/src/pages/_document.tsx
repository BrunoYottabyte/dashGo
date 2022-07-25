
import Document, { Head, Html, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
     render() {
          let active = false;
          return (
               <Html>
                    <Head>
                     
                         <link rel="preconnect" href="https://fonts.googleapis.com" />
                         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                         <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
                         <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAYAAACMGIOFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Y0RUZDRkVBNzBGMTFFOUEzN0Q5MDE2NzgzMTlFNUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Y0RUZDRkRBNzBGMTFFOUEzN0Q5MDE2NzgzMTlFNUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFRkQzRjdEQkU5NzExRTRCNTVGQjk2MTE3ODI3MTAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFRkQzRjdFQkU5NzExRTRCNTVGQjk2MTE3ODI3MTAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+C5yNYgAABtZJREFUeNrsmgls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" sizes="32x32"></link>
                    </Head>
                    <body >
                    
                          <Main />
       
                         <NextScript />
                    </body>
               </Html>
          )
     }
}