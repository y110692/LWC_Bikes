import { LightningElement, track, api, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

export default class App extends LightningElement {
	bike1 = null;
	bike2 = null;
	bike3 = null;
	bike4 = null;
	bike5 = null;
	bike6 = null;
	bikes = [];
	cart = [];
	@track filters = '';
	ready = false;
	cartName = 'CART';

	@wire(MessageContext) messageContext;


	connectedCallback() {
		setTimeout(() => {
			this.ready = true
		}, 1000);

	}

	handleLoading() {
		this.bikes = [];
		this.bike1 = {
			name: 'Electra X4',
			description: 'A sweet bike built for comfort.',
			category: 'Street',
			material: 'Steel',
			price: '$2,700',
			pictureUrl: 'https://greatebike.eu/uploads/products/3208/big/lovelec-komo-1.jpg',
			key: '01'
		};

		this.bike2 = {
			name: 'Rock Machine 2022',
			description: 'A powerful bike built for adventures.',
			category: 'Mountain',
			material: 'Steel',
			price: '$4,300',
			pictureUrl: 'https://greatebike.eu/uploads/products/2190/big/rock-machine-crossride-e400-14.jpg',
			key: '06'
		};
		this.bike3 = {
			name: 'Rock Machine Century',
			description: 'A retro bike built for gentlemen.',
			category: 'Street',
			material: 'Steel',
			price: '$14,700',
			pictureUrl: 'https://i.pinimg.com/originals/66/df/51/66df51118ee1925277a6f910f37e0446.png',
			key: '02'
		};
		this.bike4 = {
			name: 'Rock Machine 2000',
			description: 'A powerful bike built for racers.',
			category: 'Racing',
			material: 'Carbon',
			price: '$9,400',
			pictureUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-road-bikes-1656433915.jpg',
			key: '03'
		};
		this.bike5 = {
			name: 'Stels Navigator',
			description: 'A bike built for poor people.',
			category: 'Street',
			material: 'Wood',
			price: '$1,300',
			pictureUrl: 'https://bikejan.com/wp-content/uploads/DSC4106-wood-bike-jan.jpg',
			key: '04'
		};
		this.bike6 = {
			name: 'Format 1414',
			description: 'A dangerous bike built for professionals.',
			category: 'Mountain',
			material: 'Carbon',
			price: '$5,100',
			pictureUrl: 'https://ae01.alicdn.com/kf/U4118d16938b747d6a247e5cd6132b0d7E/Bicycle-format-1212-27-5-height-M-2019-2020-Forward-Lightweight-Durable-Reliable-Sports-Equipment-Safety.jpg_Q90.jpg_.webp',
			key: '05'
		};

		if (this.filters.length === 0) {
			this.bikes.push(this.bike1);
			this.bikes.push(this.bike2);
			this.bikes.push(this.bike3);
			this.bikes.push(this.bike4);
			this.bikes.push(this.bike5);
			this.bikes.push(this.bike6);
		}
		else {
			if (this.filters === this.bike1.category || this.filters === this.bike1.material) {
				this.bikes.push(this.bike1);
			}
			if (this.filters === this.bike2.category || this.filters === this.bike2.material) {
				this.bikes.push(this.bike2);
			}
			if (this.filters === this.bike3.category || this.filters === this.bike3.material) {
				this.bikes.push(this.bike3);
			}
			if (this.filters === this.bike4.category || this.filters === this.bike4.material) {
				this.bikes.push(this.bike4);
			}
			if (this.filters === this.bike5.category || this.filters === this.bike5.material) {
				this.bikes.push(this.bike5);
			}
			if (this.filters === this.bike6.category || this.filters === this.bike6.material) {
				this.bikes.push(this.bike6);
			}
		}
	}

	@api
	get isBikes() {
		return this.bikes.length > 0;
	}

	handleClosing() {
		this.bikes = [];
		this.filters = '';
		this.cart = [];
		this.cartName = 'Cart';
	}

	handleFilter(event) {
		console.log(event.detail);
		this.filters = event.detail;
		this.handleLoading();
	}

	handleResetFilters() {
		this.filters = '';
		this.handleLoading();
	}

	handleAddToCart(event) {
		console.log('got ' + event.detail);
		for (let i = 0; i < this.bikes.length; i++) {
			if (this.bikes[i].key === event.detail) {
				this.cart.push(this.bikes[i]);
				console.log(this.cart.length);
				this.cartName = 'CART ( ' + this.cart.length.toString() + ')';
			}
		}

		const message = {
			cartDetails: this.cart
		};
		publish(this.messageContext, SAMPLEMC, message);

	}
}