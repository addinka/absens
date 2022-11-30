import { 
	Component, 
	OnInit, 
	AfterViewInit, 
	AfterViewChecked, 
	QueryList, 
	ViewChild, 
	ViewChildren, 
	ElementRef, 
	Renderer2 
} from '@angular/core';
import { MinigameService } from '../../core/services/minigame.service';

@Component({
	selector: 'app-mini-game',
	templateUrl: './mini-game.component.html',
	styleUrls: ['./mini-game.component.scss']
})
export class MiniGameComponent implements OnInit, AfterViewInit, AfterViewChecked {

	@ViewChild('pregameScreen', {static: false}) pregameScreen: ElementRef;
	@ViewChild('postgameScreen', {static: false}) postgameScreen: ElementRef;
	@ViewChild('gameScreen', {static: false}) gameScreen: ElementRef;
	@ViewChildren('letter') letters:QueryList<ElementRef>;
	@ViewChildren('keyboard') keyboardKeys:QueryList<ElementRef>;

	puzzles = {
		1: {
			solution: "facebook",
			src: "../../../assets/images/1.jpg"
		},
		2: {
			solution: "power plant",
			src: "../../../assets/images/2.jpg"
		},
		3: {
			solution: "serial killer",
			src: "../../../assets/images/3.jpg"
		},
		4: {
			solution: "sandwich",
			src: "../../../assets/images/4.jpg"
		},
		5: {
			solution: "benchmark",
			src: "../../../assets/images/5.jpg"
		},
		6: {
			solution: "baking soda",
			src: "../../../assets/images/6.jpg"
		},
		7: {
			solution: "usb webcam",
			src: "../../../assets/images/7.jpeg"
		},
		8: {
			solution: "elon musk",
			src: "../../../assets/images/8.jpg"
		},
		9: {
			solution: "butterscotch",
			src: "../../../assets/images/9.jpg"
		},
		10: {
			solution: "sprint planning",
			src: "../../../assets/images/10.jpeg"
		},
	};

	keysCorrespondence: any = {
		0: 81,
		1: 87,
		2: 69,
		3: 82,
		4: 84,
		5: 89,
		6: 85,
		7: 73,
		8: 79,
		9: 80,
		10: 65,
		11: 83,
		12: 68,
		13: 70,
		14: 71,
		15: 72,
		16: 74,
		17: 75,
		18: 76,
		19: 90,
		20: 88,
		21: 67,
		22: 86,
		23: 66,
		24: 78,
		25: 77,
	}

	howToPlaySrc = "../../../assets/images/how_to_play.png";
	winSrc = "../../../assets/icons/crown.svg";
	loseSrc = "../../../assets/icons/straight_face.svg";
	currentPuzzleIndex = 1;
	puzzleString = [];
	puzzleImageSrc = "";
	remainingLetters = [];
	lettersArray = [];
	keyboardKeysArray = [];
	gameStarted: boolean = false;
	gameFinished: boolean = false;
	isSolved = false;
	lifelineUsed = false;
	intervalId: any;
	remaining: any = 40;
	score: any = 0;
	wrongStreak: any = 1;
	myEmpId : any;
	myScoreId : any = "";
	currentPuzzleRankings = [];
	totalRankings = [];

	constructor (
		private renderer: Renderer2,
		protected minigameService: MinigameService
	) { }

	ngOnInit() {
		this.myEmpId = localStorage.getItem('id');
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.getNewPuzzle(this.currentPuzzleIndex);
		});
	}

	ngAfterViewChecked() {
		this.keyboardKeysArray = this.keyboardKeys.toArray();
		this.lettersArray = this.letters.toArray();
	}

	refreshLeaderboard(index) {
		this.getScoreLeaderboard(index);
		this.getTotalScoreLeaderboard();
	}

	startGame() {
		this.gameStarted = true;
		this.gameScreen.nativeElement.setAttribute('style', 'display: block;');
		this.pregameScreen.nativeElement.setAttribute('style', 'display: none;');
		this.startTimer();
	}

	getNewPuzzle(index) {
		this.currentPuzzleIndex = index;
		if (this.puzzles[index] !== undefined) {
			this.puzzleString = [...(this.puzzles[index].solution.toUpperCase())];
			this.puzzleImageSrc = this.puzzles[index].src;
			if (this.remaining === 0 && this.gameStarted) {
				this.remaining = 40;
				this.startTimer();
			} else {
				this.remaining = 40;
			}

			this.remainingLetters = this.puzzleString.filter(letter => letter != ' ');
			this.remainingLetters = [...new Set(this.remainingLetters)];

			if (this.gameStarted) {
				if (this.currentPuzzleIndex >= Object.keys(this.puzzles).length) {
					this.gameFinished = true;
				}
				this.resetPressedKeys();
				this.score = 0;
				this.wrongStreak = 1;
				this.isSolved = false;
				this.gameScreen.nativeElement.setAttribute('style', 'display: block;');
				this.postgameScreen.nativeElement.setAttribute('style', 'display: none;');
			}
		}
	}

	resetPressedKeys() {
		for (let i = 0; i < this.keyboardKeysArray.length; i++) {
			this.keyboardKeysArray[i].nativeElement.removeAttribute('disabled');
			this.keyboardKeysArray[i].nativeElement.setAttribute('style', 'visibility: visible;');
		}
		for (let i = 0; i < this.lettersArray.length; i++) {
			this.lettersArray[i].nativeElement.removeAttribute('value');
			this.lettersArray[i].nativeElement.setAttribute('locked', 'false');
		}
	}

	startTimer() {
		this.intervalId = setInterval(() => {
			if (this.remaining === 0) {
				if (this.isSolved === false) {
					this.refreshLeaderboard(this.currentPuzzleIndex);
					this.postgameScreen.nativeElement.setAttribute('style', 'display: block;');
					this.gameScreen.nativeElement.setAttribute('style', 'display: none;');
				}
				clearInterval(this.intervalId);
			} else {
				this.remaining -= 0.25;
			}
		}, 250);
	}

	checkSolved() {
		let flag: boolean = true;
		for (let i = 0; i < this.lettersArray.length; i++) {
			if (this.lettersArray[i].nativeElement.getAttribute('locked') === "false") {
				flag = false;
			}
		}
		if (flag === true) {
			this.isSolved = true;
			this.submitScore();
			this.refreshLeaderboard(this.currentPuzzleIndex);
			this.postgameScreen.nativeElement.setAttribute('style', 'display: block;');
			this.gameScreen.nativeElement.setAttribute('style', 'display: none;');
		}
	}

	// useLifeline() {
	// 	let randomIndex = Math.floor(Math.random() * (this.remainingLetters.length));
	// 	this.tryInput(this.remainingLetters[randomIndex].charCodeAt(0));
	// 	this.lifelineUsed = true;
	// }

	tryInput(charCode) {
		for (let i = 0; i < Object.keys(this.keysCorrespondence).length; i++) {
			if (this.keysCorrespondence[i] === charCode) {
				this.keyboardKeysArray[i].nativeElement.setAttribute('disabled', true);
				this.keyboardKeysArray[i].nativeElement.setAttribute('style', 'visibility: hidden;');
				break;
			}
		}
		const input = String.fromCharCode(charCode);
		const pattern = '^[' + input + input.toLowerCase() + ']{1}$';
		let correct: boolean = false;
		
		for (let i = 0; i < this.lettersArray.length; i++) {
			if (this.lettersArray[i].nativeElement.getAttribute('locked') === "false") {
				if (this.lettersArray[i].nativeElement.getAttribute('pattern') === pattern) {
					this.lettersArray[i].nativeElement.setAttribute('locked', "true");
					this.renderer.setAttribute(this.lettersArray[i].nativeElement, 'value', input);
					correct = true;
					this.remainingLetters = this.remainingLetters.filter(letter => letter != input);
				}
			}
		}

		if (correct === true) {
			this.wrongStreak = 1;
			if (this.remaining > 30) {
				this.score += 300;
			} else if (this.remaining > 20) {
				this.score += 200;
			} else {
				this.score += 100;
			}
			this.checkSolved();
		} else {
			this.wrongStreak += 1;
			this.score -= 50 * this.wrongStreak;
		}
	}

	submitScore() {
		if (this.score > 0) {
			const param = {
				minigameID: "c5tpvp5gp8nmj33m3c00", 
				stageID: "guesspicture"+this.currentPuzzleIndex, 
				score: this.score
			};
			this.minigameService.submitScore(param)
			.subscribe(
				response => {
					this.myScoreId = response.InsertedID;
					this.refreshLeaderboard(this.currentPuzzleIndex);
				},
				error => {
					console.log(error);
				});
		}
	}

	getScoreLeaderboard(index) {
		this.minigameService.getLeaderboard("c5tpvp5gp8nmj33m3c00","guesspicture"+index)
		.subscribe(
			response => {
				this.currentPuzzleRankings = response;
			},
			error => {
			});
	}

	getTotalScoreLeaderboard() {
		this.minigameService.getLeaderboard("c5tpvp5gp8nmj33m3c00")
		.subscribe(
			response => {
				this.totalRankings = response;
			},
			error => {
			});
	}
}
