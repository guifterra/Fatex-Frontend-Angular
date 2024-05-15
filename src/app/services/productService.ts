// ProductService
import { Injectable } from '@angular/core';
import { Product } from '../domain/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // Método para simular a obtenção de produtos
    getProductsMini(): Promise<Product[]> {
        return new Promise((resolve) => {
            // Suponha que aqui você esteja fazendo uma requisição HTTP para obter os produtos
            // Por simplicidade, estamos apenas resolvendo com dados simulados
            const products: Product[] = [
                { id: 1, name: 'Product 1', price: 10, description: 'Description 1' },
                { id: 2, name: 'Product 2', price: 20, description: 'Description 2' },
                { id: 3, name: 'Product 3', price: 30, description: 'Description 3' },
                // Adicione mais produtos conforme necessário
            ];
            resolve(products);
        });
    }
}
