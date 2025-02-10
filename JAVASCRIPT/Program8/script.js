function choosePlan() {
    const wantsTrainer = document.getElementById('trainer').value;
    const wantsDietPlan = document.getElementById('dietPlan').value;
    let suggestedPlan = '';
  
    if (wantsTrainer === "yes" && wantsDietPlan === "yes") {
      suggestedPlan = "VIP Plan ($80/month): Includes Gym, Personal Trainer, and Diet Plan.";
    } else if (wantsTrainer === "yes") {
      suggestedPlan = "Premium Plan ($50/month): Includes Gym and Personal Trainer.";
    } else if (wantsDietPlan === "yes") {
      suggestedPlan = "VIP Plan ($80/month) for Diet Plan access.";
    } else {
      suggestedPlan = "Basic Plan ($20/month): Only Gym Access.";
    }
  
    document.getElementById('result').innerText = suggestedPlan;
  }
  