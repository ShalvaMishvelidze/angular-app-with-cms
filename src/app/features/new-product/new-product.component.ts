import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  standalone: false,
})
export class NewProductComponent implements AfterViewInit, OnDestroy {
  @ViewChild('microFrontendIframe') iframeRef!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    window.addEventListener('message', this.messageListener);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.messageListener);
  }

  private messageListener = (event: MessageEvent) => {
    if (event.origin !== 'http://localhost:3001') return;

    if (event.data.type === 'READY') {
      // Iframe is ready, now send token
      this.sendToken();
    } else {
      console.log('Message from Next.js:', event.data);
    }
  };

  onIframeLoad() {
    // No need to send token here
  }

  sendToken() {
    const iframeWindow = this.iframeRef.nativeElement.contentWindow;
    if (iframeWindow) {
      iframeWindow.postMessage(
        { token: localStorage.getItem('token') },
        'http://localhost:3001'
      );
    }
  }
}
