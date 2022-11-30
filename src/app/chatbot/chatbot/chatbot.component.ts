import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { ChatbotService } from '../../core/services/chatbot.service';
import { ToastrService } from 'ngx-toastr';
import { MapsAPILoader } from "@agm/core";
// Start of Modal Imports //
import { DisplayImageModalComponent } from '../../display-image-modal/display-image-modal/display-image-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { LogModalComponent } from '../../log-modal/log-modal/log-modal.component';
// End of Modal Imports //

declare var google;

@Component({
	selector: 'app-chatbot',
	templateUrl: './chatbot.component.html',
	styleUrls: ['./chatbot.component.scss']
})

export class ChatbotComponent implements OnInit {

	pastMessage = []; // display past conversations by Assistant and User
	currResponses = [];
	currResponsesLength = 99;
	currRecurIndex = 0;
	currMessage: any; // display current Assistant's response
	multipleOptions = []; // display current multi choice options
	imageSrc = ''; // display current image if available
	logMessage = ''; // message logs for developers
	logMessageFull = ''; // the entirety of it
	showFeedback = false;
	isTutorial: boolean;
	firstTimeTutorialInput = true;
	buttonAppearance = false;
	imageFormat = '../../../../assets/images/';
	titles = [
		"Main Page",
		"Welcome to the Batcave",
		"Menu Bar",
		"Welcome to the Batcave",
		"Dashboard",
		"Welcome to the Batcave",
		"Making a request",
		"Welcome to the Batcave",
		"Tutorial complete",
	];
	currTitle = "";
	mobileScaler = 0.5;
	millisecondsCheck: number;

	// User Info
	username = "username";
	replacedString: string;
	managerName: string;
	riskRegion: [];
	weatherData: [];
	home: string;
	workDetails: [];

	// ngModel Values
	lastUserInput: string;
	currUserInput: string;

	// formatted data for API param
	inputText = {
		'sessionID': localStorage.getItem('chatbotSessionId'),
		'text': ''
	};

	// AGM Map
	lat = 51.678418;
	lon = 7.809007;
	latArr = [];
	lonArr = [];
	zoom = 10;
	kecamatan = "";
	status: string;
	userLat: number;
	userLng: number;
	// userLat = -6.118099503521
	// userLng = 106.76648392854
	sendInputToUser = true;

	private geoCoder;

	constructor(
		public modalService: ModalService,
		public chatbotService: ChatbotService,
		public toastr: ToastrService,
		private employeeService: EmployeeService,
		private maps: MapsAPILoader,
		private ngZone: NgZone
	) { }

	ngOnInit() {
		let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		if (width < 430) {
			this.mobileScaler = 0.5;
		} else {
			this.mobileScaler = 1.0;
		}

		this.currTitle = "Welcome to the Tutorial";
		this.currMessage = { text: '', imageSrc: '', type: '' };
		this.chatbotService.getNewSessionId().subscribe(
			response => {
				this.logMessage = '[Get Session Id Response]' + JSON.stringify(response);
				this.logMessageFull = this.logMessageFull + this.logMessage;
				localStorage.setItem('chatbotSessionId', response.session_id);
				this.millisecondsCheck = Math.floor((new Date).getTime() / 1000);
				console.log(this.millisecondsCheck);
				this.employeeService.getUserDashboard()
					.subscribe(
						response => {
							console.log(response);
							this.username = response.name;
							this.managerName = response.managerName;
							this.home = response.home;
							this.workDetails = response.workDetails[0];

							if (response.weatherData !== null && response.weatherData !== undefined)
								this.weatherData = response.weatherData;
							else
								this.weatherData = null;

							if (response.riskRegion !== null && response.riskRegion !== undefined) {
								this.riskRegion = response.riskRegion[0];
								this.lat = this.riskRegion["lokasi"]["lat"];
								this.lon = this.riskRegion["lokasi"]["lon"];
								this.kecamatan = this.getLocation(this.riskRegion["title"]);
							}
							else {
								this.riskRegion = null;
							}

							if (response.tutorDone === 'Y') {
								this.isTutorial = false;
							} else {
								this.isTutorial = true;
								this.currMessage = {
									text: [{ content: "Hi i'm Neena, your personal assistant. Since this is your first time here, would you like a quick tutorial?", type: 'string' }],
									imageSrc: '',
									type: 'neena'
								};
								this.multipleOptions.push({ label: 'No, skip the tutorial', value: { input: { text: 'skipbotlupusrex-skipbot00Q' } } });

								if (response.isHSC === 'Y' || response.isManager === 'Y' || response.isSC === 'Y') {
									this.multipleOptions.push({ label: 'Yes, start the tutorial', value: { input: { text: 'ManagerTutorialEngagedSecretPasscode' } } });
								} else {
									this.multipleOptions.push({ label: 'Yes, start the tutorial', value: { input: { text: 'BasicTutorialEngagedSecretPasscode' } } });
								}
							}
						},
						error => {
							this.showError(error.error);
						}
					);
			},
			error => {
				this.logMessage = '[Get Session Id Error]' + JSON.stringify(error);
				this.logMessageFull = this.logMessageFull + this.logMessage;
			});

		this.maps.load().then(() => {
			this.geoCoder = new google.maps.Geocoder();
		});
	}

	@HostListener('document:keydown.control.shift.a') sendLog(event: KeyboardEvent) {
		this.openDevFeedback();
	}

	onResize(event) {
		if (event.target.screen.width < 430) {
			this.mobileScaler = 0.5;
		} else {
			this.mobileScaler = 1.0;
		}
	}

	showSuccess(msg) {
		this.toastr.success(msg);
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	passValue(item) {
		if (item.value.input.text === 'skipbotlupusrex-skipbot00Q') {
			this.finishTutorial();
		} else {
			if (item.value.input.text === 'BasicTutorialEngagedSecretPasscode' && this.isTutorial) {
				this.currTitle = this.titles[this.currRecurIndex];
			}
			this.currUserInput = item.label;
			this.userInput(item);
		}
	}

	openFeedback() {
		this.modalService.create({
			component: LogModalComponent,
			inputs: {
				logMessage: this.logMessage,
				lastUserInput: this.lastUserInput
			}
		});
	}

	openModal(imageSrc) {
		this.modalService.create({
			component: DisplayImageModalComponent,
			inputs: {
				imageSrc: imageSrc
			}
		});
	}

	openDevFeedback() {
		this.modalService.create({
			component: LogModalComponent,
			inputs: {
				logMessage: this.logMessageFull,
				lastUserInput: this.lastUserInput
			}
		});
	}

	tutorialFunc() {
		this.buttonAppearance = true;
		let currentMessage = [];
		if (this.currResponses[this.currRecurIndex].response_type === 'text') {
			let splitText = this.currResponses[this.currRecurIndex].text.split('{{');
			if (splitText.length === 1) {
				currentMessage.push({ content: splitText[0], type: 'string' })
			} else {
				for (let i = 0; i < splitText.length; i++) {
					let splitSplitText = splitText[i].split('}}');
					if (splitSplitText.length === 1) {
						currentMessage.push({ content: splitSplitText[0], type: 'string' })
					} else {
						for (var j = 0; j < splitSplitText.length; j++) {
							if (j === 0) {
								currentMessage.push({ content: this.imageFormat + splitSplitText[j], type: 'image' })
							} else {
								currentMessage.push({ content: splitSplitText[j], type: 'string' })
							}
						}
					}
				}
			}
		}
		this.currMessage = {
			text: currentMessage,
			imageSrc: '',
			type: 'neena',
			imageWidth: 120,
			imageHeight: 150
		};
		if (this.currRecurIndex < this.currResponsesLength - 1) {
			if (this.currResponses[this.currRecurIndex + 1].response_type === 'image') {
				console.log(this.currResponses[this.currRecurIndex + 1].source);
				this.currMessage.imageSrc = this.imageFormat + this.currResponses[this.currRecurIndex + 1].source;
				if (this.currResponses[this.currRecurIndex + 1].source === 'DashboardDetails.png') {
					this.currMessage.imageWidth = 300;
					this.currMessage.imageHeight = 200;
				} else if (this.currResponses[this.currRecurIndex + 1].source === 'MenuBar.png') {
					this.currMessage.imageWidth = 300;
					this.currMessage.imageHeight = 100;
				} else if (this.currResponses[this.currRecurIndex + 1].source === 'DashboardMain.png') {
					this.currMessage.imageWidth = 300;
					this.currMessage.imageHeight = 310;
				} else if (this.currResponses[this.currRecurIndex + 1].source === 'CreateTravelRequestBlank.gif') {
					this.currMessage.imageWidth = 270;
					this.currMessage.imageHeight = 210;
				}
			}
		}
		console.log(this.currMessage);
	}

	nextTutorial() {
		this.currRecurIndex++;
		if (this.currResponses[this.currRecurIndex].response_type !== 'text') {
			this.currRecurIndex++;
			this.tutorialFunc();
		} else {
			this.tutorialFunc();
		}
		console.log(this.currRecurIndex);
		this.currTitle = this.titles[this.currRecurIndex];
	}

	backTutorial() {
		this.currRecurIndex--;
		if (this.currResponses[this.currRecurIndex].response_type !== 'text') {
			this.currRecurIndex--;
			this.tutorialFunc();
		} else {
			this.tutorialFunc();
		}
		console.log(this.currRecurIndex);
		this.currTitle = this.titles[this.currRecurIndex];
	}
	// delayedResponses() {
	// 	//cuman jalan kalau pas lagi tutorial
	// 	if (this.isTutorial) {
	// 		this.multipleOptions = [];
	// 		if (this.currResponses[this.currRecurIndex].response_type === 'text') {
	// 			if (this.currMessage.text !== '') {
	// 				this.pastMessage.push(this.currMessage);
	// 				if (this.firstTimeTutorialInput) {
	// 					this.firstTimeTutorialInput = false;
	// 				} else if (this.currRecurIndex === 0) {
	// 					this.pastMessage.push({ text: this.currUserInput, imageSrc: '', type: 'user' });
	// 				}
	// 			}
	// 			this.currMessage = { text: this.currResponses[this.currRecurIndex].text, imageSrc: '', type: 'neena' };
	// 		} else if (this.currResponses[this.currRecurIndex].response_type === 'image') {
	// 			this.imageSrc = this.currResponses[this.currRecurIndex].source;
	// 			this.currMessage.imageSrc = this.imageSrc;
	// 		} else if (this.currResponses[this.currRecurIndex].response_type === 'option') {
	// 			if (this.currMessage.text !== '') {
	// 				this.pastMessage.push(this.currMessage);
	// 				if (this.firstTimeTutorialInput) {
	// 					this.firstTimeTutorialInput = false;
	// 				} else if (this.currRecurIndex === 0) {
	// 					this.pastMessage.push({ text: this.currUserInput, imageSrc: '', type: 'user' });
	// 				}
	// 			}
	// 			this.currMessage = { text: this.currResponses[this.currRecurIndex].title, imageSrc: '', type: 'neena' };
	// 			for (let i = 0; i < this.currResponses[this.currRecurIndex].options.length; i++) {
	// 				this.multipleOptions.push(this.currResponses[this.currRecurIndex].options[i]);
	// 			}
	// 			console.log(this.multipleOptions);
	// 		}
	// 		if (this.currRecurIndex >= this.currResponsesLength - 1) {
	// 			// this.imageSrc = '';
	// 			this.currResponsesLength = 0;
	// 			this.currResponses = [];
	// 			this.currRecurIndex = 0;
	// 			//kalau user ngeklik button skip tutorial ditengah2 line, mencegah munculnya tampilan tambahan
	// 			if(!this.isTutorial){
	// 				this.pastMessage = [];
	// 				this.currMessage = { text: '', imageSrc: '', type: '' };
	// 				this.multipleOptions = [];
	// 				this.imageSrc = '';
	// 			}
	// 		} else {
	// 			this.imageSrc = '';
	// 			this.currRecurIndex++;
	// 			//kalau user ngeklik button skip tutorial ditengah2 line, mencegah munculnya tampilan tambahan
	// 			if(!this.isTutorial){
	// 				this.pastMessage = [];
	// 				this.currMessage = { text: '', imageSrc: '', type: '' };
	// 				this.multipleOptions = [];
	// 				this.imageSrc = '';
	// 			}
	// 			setTimeout(this.delayedResponses.bind(this), this.currResponses[this.currRecurIndex].time);
	// 		}
	// 	}
	// }

	userInput(item?) {
		if (this.currUserInput !== '') {
			this.multipleOptions = [];
			this.inputText = {
				'sessionID': localStorage.getItem('chatbotSessionId'),
				'text': this.currUserInput
			};

			if (item) {
				this.inputText = {
					'sessionID': localStorage.getItem('chatbotSessionId'),
					'text': item.value.input.text
				};
			}
			const currentMilliseconds = Math.floor((new Date).getTime() / 1000);
			console.log(currentMilliseconds);
			if (currentMilliseconds >= this.millisecondsCheck + 180) {
				this.chatbotService.getNewSessionId().subscribe(
					response => {
						this.logMessage = '[Get Session Id Response]' + JSON.stringify(response);
						this.logMessageFull = this.logMessageFull + this.logMessage;
						localStorage.setItem('chatbotSessionId', response.session_id);
						this.millisecondsCheck = Math.floor((new Date).getTime() / 1000);
						console.log(this.millisecondsCheck);
						this.processingChatbot();
					},
					error => {
						this.showError(error.error);
					});
			} else {
				this.processingChatbot();
			}
		}
	}

	processingChatbot() {
		this.logMessage = '[User Input Param]' + JSON.stringify(this.inputText);
		this.logMessageFull = this.logMessageFull + this.logMessage;
		this.chatbotService.userInput(this.inputText).subscribe(
			response => {
				this.logMessage = this.logMessage + '[User Input Response]' + JSON.stringify(response);
				this.logMessageFull = this.logMessageFull + this.logMessage;
				console.log(response);

				const savedResponse = response.output.generic[0];
				const savedAdditionalResponse = response.output.generic[1];
				const savedWholeResponse = response.output.generic;

				if (this.isTutorial) {
					this.currResponses = savedWholeResponse;
					this.currResponsesLength = savedWholeResponse.length;
					this.tutorialFunc();
				} else {
					// Start of Text Handling //
					if (this.currMessage.text !== '' && this.currMessage.text !== undefined) {
						this.pastMessage.push(this.currMessage);
						this.latArr.push(this.lat);
						this.lonArr.push(this.lon);
						this.latArr.push(this.lat);
						this.lonArr.push(this.lon);
					}
					this.pastMessage.push({ text: this.currUserInput, imageSrc: '', type: 'user', isMap: '' });
					console.log(this.pastMessage);

					if (this.sendInputToUser === false) {
						var address = this.inputText.text;
						console.log(address);
						const message = "Below is the map of risk area near " + address;

						this.currMessage = { text: "Loading map...", imageSrc: '', type: 'neena', isMap: 'true' };
						this.sendInputToUser = true;
						this.geoCoder.geocode({ 'address': address }, (results, status) => {
							console.log(results);
							this.status = status;

							if (status === 'OK') {
								this.lat = results[0].geometry.location.lat();
								this.lon = results[0].geometry.location.lng();

								this.chatbotService.getLocations({
									'lat': results[0].geometry.location.lat(),
									'lon': results[0].geometry.location.lng(),
									'radius': 20
								})
									.subscribe(
										response => {
											let newArray = []
											let location = ""

											if (response !== null) {
												for (let i = 0; i < response.length; i++) {
													location = this.getLocation(response[i]["title"])
													if (response[i]["kategori"] == "high") {
														newArray.push({ loc: location, lat: response[i]["lokasi"]["lat"], lon: response[i]["lokasi"]["lon"], color: "red" });
													} else if (response[i].kategori == "medium") {
														newArray.push({ loc: location, lat: response[i]["lokasi"]["lat"], lon: response[i]["lokasi"]["lon"], color: "yellow" });
													} else if (response[i].kategori == "low") {
														newArray.push({ loc: location, lat: response[i]["lokasi"]["lat"], lon: response[i]["lokasi"]["lon"], color: "green" });
													}
												}

												this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: 'true', markers: newArray };
											}
											else {
												this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: 'true' };
											}

										});

							} else {
								// alert('Geocode was not successful for the following reason: ' + status);
								this.currMessage = { text: "Area name not found", imageSrc: '', type: 'neena', isMap: '' };
							}
						});



						// this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: ''};
					} else if (savedResponse.response_type === 'search') {
						let message = savedResponse.results[0].body;
						message += '<br><br>' + savedAdditionalResponse.text;
						// for(let i=0;i<savedResponse.results.length;i++) {
						// 	message += '<br><br>' + savedResponse.results[i].body;
						// }
						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
					} else if (savedResponse.response_type === 'suggestion') {
						const message = 'I’m sorry, but I’m not sure how to answer that. Could you please provide more detail ? If you have any feedback to help improve this answer you can let me know by clicking the feedback button.';
						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
						this.showFeedback = true;
					} else if (savedResponse.response_type === 'option') {
						this.currMessage = { text: savedResponse.title, imageSrc: '', type: 'neena', isMap: '' };
						for (let i = 0; i < savedResponse.options.length; i++) {
							this.multipleOptions.push(savedResponse.options[i]);
						}
					} else if (response.output.intents === undefined) {
						this.currMessage = { text: savedResponse.text, imageSrc: '', type: 'neena', isMap: '' };
					} else if (response.output.intents[0].intent === 'General_Greetings') {
						let splitString = this.username.split(" ", 1)
						let firstName = this.capitalizeString(splitString[0])
						const message = savedResponse.text.replace("user", firstName);

						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
					} else if (response.output.intents[0].intent === 'Manager_Info') {
						const message = "Your manager name is " + this.capitalizeName(this.managerName);

						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
					} else if (response.output.intents[0].intent === 'Weather_Info') {
						var message = "";
						if (this.weatherData === null || this.riskRegion === null) {
							message = "Unfortunately, we are unable to determine your location right now, please try again later";
						}
						else {
							let location = this.riskRegion["title"];
							let humidity = this.weatherData["main"]["humidity"];
							let temperature = this.weatherData["main"]["feels_like"];
							let weather = this.weatherData["weather"][0]["description"];

							message = "The weather is " + weather + " in " + this.getLocation(location) +
								". The temperature is " + temperature + "°C with " + humidity + "% humidity";
						}

						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
					} else if (response.output.intents[0].intent === 'General_About_User') {
						const message = "Your name is " + this.capitalizeName(this.username);

						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
					} else if (response.output.intents[0].intent === 'Risk_Info') {
						const message = "Please input the name of the area"
						this.sendInputToUser = false;

						this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };

					} else if (response.output.intents[0].intent === 'Time_Info') {
						if (response.output.entities[2] === null || response.output.entities[2] === undefined || response.output.entities[2] === "") {
							let currDate = new Date()
							let hour = currDate.getHours()
							let minutes = currDate.getMinutes()
							let seconds = currDate.getSeconds()
							let realHour = '';
							let realMinutes = '';
							let realSeconds = '';


							if (hour < 10) {
								realHour = '0' + hour.toString();
							} else {
								realHour = hour.toString();
							}

							if (minutes < 10) {
								realMinutes = '0' + minutes.toString();
							} else {
								realMinutes = minutes.toString();
							}

							if (seconds < 10) {
								realSeconds = '0' + seconds.toString();
							} else {
								realSeconds = seconds.toString();
							}

							let currTime = realHour + ":" + realMinutes + ":" + realSeconds;
							const message = "The current time is " + currTime;

							this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
						}
						else {
							let time = response.output.entities[2].value;
							let d = new Date();
							let n = d.getTimezoneOffset();
							let offset = Math.floor(n / 60);
							let minuteOffset = n % 60;

							let hour = time.charAt(0) + time.charAt(1);
							let minutes = time.charAt(3) + time.charAt(4);
							let seconds = time.charAt(6) + time.charAt(7);

							let hourNumber = Number(hour);
							let newHour = hourNumber - offset

							if (newHour > 23)
								newHour = newHour % 24;
							else if (newHour < 0)
								newHour = newHour + 24;

							let minutesNumber = Number(minutes);
							let newMinutes = minutesNumber - minuteOffset

							if (newMinutes > 59)
								newMinutes = newMinutes % 60;
							else if (newMinutes < 0)
								newMinutes = newMinutes + 60;

							let finalHour = newHour.toString();
							let finalMinutes = newMinutes.toString();

							if (newHour < 10)
								finalHour = '0' + newHour.toString();

							if (newMinutes < 10)
								finalMinutes = '0' + newMinutes.toString();


							let newTime = finalHour + ":" + finalMinutes + ":" + seconds
							const message = "The time is " + newTime;

							this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
						}
					} else if (response.output.intents[0].intent === 'Date_Info') {
						if (response.output.entities[1] === null || response.output.entities[1] === undefined || response.output.entities[1] === "") {
							let [date, month, year] = new Date().toLocaleDateString("it-IT").split("/")

							let realMonth = '';
							let realDate = '';

							if (parseInt(month) < 10) {
								realMonth = '0' + month;
							} else {
								realMonth = month;
							}

							if (parseInt(date) < 10) {
								realDate = '0' + date;
							} else {
								realDate = date;
							}

							let newTime = year + "-" + realMonth + "-" + realDate;
							const message = "The date is " + newTime;

							this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
						}
						else {
							this.currMessage = { text: savedResponse.text, imageSrc: '', type: 'neena', isMap: '' };
						}
					} else if (response.output.intents[0].intent === 'Day_Info') {
						if (response.output.entities[1] === null || response.output.entities[1] === undefined || response.output.entities[1] === "") {
							let [date, month, year] = new Date().toLocaleDateString("it-IT").split("/")
							let day = new Date().getDay();
							var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

							let realMonth = '';
							let realDate = '';

							console.log(new Date().toLocaleDateString("en-US"));

							if (parseInt(month) < 10) {
								realMonth = '0' + month;
							} else {
								realMonth = month;
							}

							if (parseInt(date) < 10) {
								realDate = '0' + date;
							} else {
								realDate = date;
							}

							let newTime = year + "-" + realMonth + "-" + realDate;
							const message = "It is " + days[day] + " on " + newTime;

							this.currMessage = { text: message, imageSrc: '', type: 'neena', isMap: '' };
						}
						else {
							this.currMessage = { text: savedResponse.text, imageSrc: '', type: 'neena', isMap: '' };
						}
					} else {
						this.currMessage = { text: savedResponse.text, imageSrc: '', type: 'neena', isMap: '' };
					}
					// End of Text Handling //

					// Start of Image Handling //
					if (savedAdditionalResponse !== null && savedAdditionalResponse !== '' && savedAdditionalResponse !== undefined) {
						if (savedAdditionalResponse.response_type === 'image') {
							this.imageSrc = this.imageFormat + savedAdditionalResponse.source;
							this.currMessage.imageSrc = this.imageSrc;
						}
					} else {
						this.imageSrc = '';
					}
					// End of Image Handling //
				}
				this.lastUserInput = this.currUserInput;
				this.currUserInput = '';
				// console.log(this.latArr);
				// console.log(this.lonArr);
				// console.log(this.pastMessage);
			},
			error => {
				const message = 'An error occured. Could you please provide more detail ? If you have any feedback to help improve this answer you can let me know by clicking the feedback button.';
				this.currMessage = { text: message, imageSrc: '', type: 'neena' };
				this.showFeedback = true;
				this.logMessage = this.logMessage + '[User Input Error]' + JSON.stringify(error);
				this.logMessageFull = this.logMessageFull + this.logMessage;
			});
	}

	finishTutorial() {
		this.chatbotService.tutorDone().subscribe(
			response => {
				this.isTutorial = false;
				this.pastMessage = [];
				this.currMessage = { text: '', imageSrc: '', type: '' };
				this.multipleOptions = [];
				this.imageSrc = '';
				this.showSuccess('You finished the tutorial');
			},
			error => {
				this.showError(error.error);
			}
		);
	}

	capitalizeString(string) {
		string = string.toLowerCase();
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	capitalizeName(string) {
		string = string.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
		return string;
	}

	getLocation(string) {
		string = string.split(',');
		let kecamatan = string[0];
		let daerah = string[1];
		kecamatan = this.capitalizeName(kecamatan);
		daerah = this.capitalizeName(daerah);
		return kecamatan + ", " + daerah;
	}

	getAddress(addressInput) {
		this.geoCoder.geocode({ 'address': addressInput }, (results, status) => {
			return results[0].geometry.location.lat(), this.lon = results[0].geometry.location.lng(), status;
		});

	}

	getAddressTest(addressInput) {
		this.geoCoder.geocode({ 'address': addressInput }, (results, status) => {
			console.log(results);
			this.status = status;
			if (status === 'OK') {
				this.userLat = results[0].geometry.location.lat();
				this.userLng = results[0].geometry.location.lng();
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
			//   return latitude.toPromise(), longitude.toPromise(), status.toPromise();
		});

	}

}
