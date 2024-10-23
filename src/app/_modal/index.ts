import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ModalModule } from './modal.module';

platformBrowserDynamic().bootstrapModule(ModalModule).catch((err) => console.error(err));
