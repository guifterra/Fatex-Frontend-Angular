import { Component, ElementRef, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceSearchResult } from '../../modelo/PlaceSearchResult';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mapa-menu-flutuante',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, GoogleMapsModule],
  templateUrl: './mapa-menu-flutuante.component.html',
  styleUrl: './mapa-menu-flutuante.component.css'
})
export class MapaMenuFlutuanteComponent implements OnInit {

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder= '';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  constructor(private ngZone: NgZone) {}

  autocomplete: google.maps.places.Autocomplete | undefined;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
      }

      this.ngZone.run(() => {
        console.log(result);
        this.placeChanged.emit(result);
      })
    });
  }
}
