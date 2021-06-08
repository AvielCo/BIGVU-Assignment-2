import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  PLATFORM_ID,
  Inject,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Picture } from './picture.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private imageElement?: HTMLImageElement;
  @Input() picture!: Picture;
  @Input() text!: string;
  @Input() backgroundColor!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  wrapText(x: number, y: number, maxWidth: number, lineHeight: number) {
    var words = this.text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx!.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        this.ctx!.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx!.fillText(line, x, y);
  }

  canvasChange() {
    let canvasElement = this.canvas.nativeElement;

    this.ctx = canvasElement.getContext('2d');
    this.ctx!.fillStyle = this.backgroundColor;
    this.ctx!.shadowColor = '#999999';
    this.ctx!.shadowBlur = 5;
    this.ctx!.fillRect(0, 0, canvasElement.width, canvasElement.height);

    this.ctx!.fillStyle = this.backgroundColor === 'blue' ? 'white' : 'blue';
    this.ctx!.font = 'bold 3rem Inter';
    this.ctx!.textAlign = 'center';

    if (this.imageElement!.src != null) {
      this.ctx?.drawImage(
        this.imageElement!,
        20,
        20,
        this.imageElement!.width,
        this.imageElement!.height,
        10,
        10,
        canvasElement.width,
        canvasElement.height
      );
    }

    const x = canvasElement.width - this.imageElement!.width / 2;
    const textMetrics: TextMetrics = this.ctx?.measureText(this.text)!;

    this.wrapText(
      x,
      70,
      this.imageElement!.width,
      textMetrics.fontBoundingBoxAscent
    );
  }

  initImageElement() {
    if (!this.imageElement) {
      this.imageElement = new Image();
      this.imageElement.alt = 'placeholder';
      this.imageElement.src =
        'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png';
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initImageElement();
      this.imageElement!.addEventListener('load', () => {
        this.canvasChange();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId)) {
      this.initImageElement();
      for (const change in changes) {
        if (change === 'text') {
          this.canvasChange();
        }
        if (change === 'picture' && this.picture) {
          this.imageElement!.src = this.picture!.value;
          this.imageElement!.alt = this.picture!.name;
        }
        if (change === 'backgroundColor') {
          this.canvasChange();
        }
      }
    }
  }
}
