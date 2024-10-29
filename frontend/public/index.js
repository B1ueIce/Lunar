"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js")



function clickHome() {
	let frame = document.getElementById("uv-frame");
	let home = document.getElementById("home-button");
	frame.style.display = "none"
	frame.src = ""
	home.style.display = "none"
}

async function gameFrame(url) {
	let frame = document.getElementById("uv-frame");
	if (url !== "") {
		if (url !== "https://poki.com/" 
			&& !url.includes("crazygames")
			&& !url.includes("coolmathgames")
			&& url !== "https://demo.os-js.org/"
			&& url !== "https://play.geforcenow.com/mall/"
			&& url !== "https://play.google.com/store/games?hl=en_US&gl=US"
			&& url !== "https://vscode.dev/"
			&& url !== "https://sflix.to/"
			&& url !== "https://www.emugames.net/"
			&& url !== "https://music.youtube.com/"
			&& url !== "https://www.youtube.com/"
			&& url !== "https://sites.google.com/site/unblockedgame76/"
			&& url !== "https://sites.google.com/site/classroom6x/"
			&& url !== "https://sandboxels.r74n.com/"
			&& url !== "https://slither.io"
			&& url !== "https://orteil.dashnet.org/cookieclicker/"
			&& url !== "https://open.spotify.com/search"
			&& url !== "https://www.chess.com/"
			&& url !== "https://classic.minecraft.net/"
			&& url !== "https://discord.com/app"
			&& url !== "https://anura.pro/"
		) {
			frame.src = url
			frame.style.display = "block";
		} else {
			try {
				await registerSW();
			} catch (err) {
				error.textContent = "Failed to register service worker.";
				errorCode.textContent = err.toString();
				throw err;
			}
		
			
			frame.style.display = "block";
			let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
			if (await connection.getTransport() !== "/epoxy/index.mjs") {
				await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
			}
			frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
		}
	}
	

	let home = document.getElementById("home-button");
	home.style.display = "block"
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	const url = search(address.value, searchEngine.value);

	let frame = document.getElementById("uv-frame");
	frame.style.display = "block";
	let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	if (await connection.getTransport() !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);

	let home = document.getElementById("home-button");
	home.style.display = "block"
});
