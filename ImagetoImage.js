async function Main() {
    const fetch = require("node-fetch");
    const FormData = require("form-data");
    const fs = require("node:fs");
    require("colors");
    // NOTE: This example is using a NodeJS FormData library.
    // Browsers should use their native FormData class.
    // React Native apps should also use their native FormData class.
  
    console.log("Appending data...".cyan);
    var formData = new FormData();
    formData.append("init_image", fs.readFileSync("PATH-TO-INITIAL-IMAGE")); // <<<<<<
    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", 0.5);
    formData.append("steps", 40);
    //formData.append('width', 1024);
    //formData.append('height', 1024);
    formData.append("seed", 0);
    formData.append("cfg_scale", 5);
    formData.append("samples", 1);
    formData.append("text_prompts[0][text]", "PROMPT-TO-INPUT");  // <<<<<<
    formData.append("text_prompts[0][weight]", 1);
    formData.append("text_prompts[1][text]", "THINGS-TO-AVOID (E.X. 'bad, blurry')"); // <<<<<<<<
    formData.append("text_prompts[1][weight]", -1);
    console.log("Data appended".brightGreen);
   
    console.log("Fetching from Stability.AI".cyan);
  
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image",
      {
        method: "POST",
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
          Authorization:
            "Bearer API-KEY", // Don't remove "Bearer" <<<<
        },
        body: formData,
      }
    );
    response.async = true;
    console.log("Fetch complete".brightGreen);
    console.log("Checking response...".cyan);
    if (!response.ok) {
      console.log("Errors found\nExiting Program with error:".brightRed);
  
      throw new Error(`Non-200 response: ${await response.text()}`);
    }
    console.log("No errors".brightGreen.bold);
    const responseJSON = await response.json();
  
    console.log("Creating file...".cyan);
    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `PATH-TO-OUTPUT-IMAGE-TO`, // <<<<<<<<
        Buffer.from(image.base64, "base64")
      );
    });
  }
  //------
  Main();
  
