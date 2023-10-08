import { DialogComponent } from './components/dialog/dialog.component';
import { NgModule } from "@angular/core";
import { MaterialModule } from "./angular-material.module";

@NgModule({
  declarations: [DialogComponent],
  imports: [MaterialModule],
  exports: [MaterialModule, DialogComponent]
})
export class SharedModule {}
