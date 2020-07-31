Evacuee Information Collector With Voice
===========


## Getting started for Watson Assistant


### Installation

Following [this link](https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started)

* In ‘Step 3: Create a Dialog Skill’ (3) Give your skill the name “My first skill”, you should instead go to ‘Import skill’ tab and import the “Watson-skill.json” file.
* Skip to ‘Step 6: Integrate the assistant’ and follow the instructions to have access to the “Assistant preview”.

Then you can converse with Watson as shown in the example at the end of this document.


### Converstaion example

```
Watson: Thank you for calling. We are natural disaster supplies. We would like to provide you with some supplies, but first, can I get your basic information?
Evacuee: yes
Watson: Please tell me your first name.
Evacuee: Peter
Watson: Please tell me your last name.
Evacuee: Smith
Watson: Please tell me your phone number.
Evacuee: 0123456789
Watson: How old are you?
Evacuee: 30
Watson: What is your house number?
Evacuee: 123
Watson: What is your street?
Evacuee: Broad street
Watson: Please tell me your zone (city, prefecture, state).
Evacuee: New York city
Watson: Your zip code?
Evacuee: 12345
Watson: Your name is Peter Smith, you are 30 years old, and you live in 123 Broad street New York 12345. Is that correct?
Evacuee: yes
Watson: I'll ask you some more questions.
Watson: Are you male, female, or other?
Evacuee: male
Watson: How many family members do you have? (including yourself, your partner, and children)
Evacuee: 4
Watson: Are you (or your partner) pregnant?
Evacuee: no
Watson: How old is your first child?
Evacuee: 5
Watson: Boy, girl or other?
Evacuee: boy
Watson: How old is your second child?
Evacuee: 3
Watson: Boy, girl or other?
Evacuee: girl
Watson: Thank you for registering your information.
Watson: Which supply do you need?
Evacuee: bread
Watson: How many loafs of bread do you need?
Evacuee: 4
Watson: You ordered 1 loafs of bread. Is that correct?
Evacuee: yes
Watson: Do you need anything else?
Evacuee: yes
Watson: Which supply do you need?
Evacuee: Do you have daily essentials?
Watson: In our everyday essentials inventory, we have the following: toilet kit, sanitization kit, blanket, baby bottle, cooking pan, kettle, cassette stove, gas can, charcoal, deodorant, surgical mask, hand soap, hand sanitizer, disposable mat, and toilet paper.
Evacuee: toilet paper
Watson: How many rolls do you need?
Evacuee: 1
Watson: You ordered 1 rolls of toilet paper. Is that correct?
Evacuee: yes
Watson: Do you need anything else?
Evacuee: no
Watson: Thank you for placing your order. You can receive it at your nearest evacuation center.
```





## Getting started for Voice Agent with Watson deployment

### Pre-requisites
* make a twilio account
* apply for a number (trial number gives you a US number and 1500JPY of credit)
* ‘Watson assistant’ service deployed in IBM cloud services (with a dialog (skill) available) 
* ‘Speech to Text’ service deployed in IBM cloud services
* ‘Text to Speech’ service deployed in IBM cloud services

Go to the IBM cloud webpage, then apply for the ‘Voice Agent with Watson’ service.
In the ‘Getting Started’ tab, step (3), click on the *Create an Agent* hyperlink.

### Set the following parameters:
* Agent Type:* Voice

* Name:* < choose an agent name >

* Phone number:* < enter the number provided by twilio >

#### In 'Conversation': (make sure the ‘Enable location 1’ checkbox is checked)

* Service Type:* My Watson Assistant Service instance
* Location:* < choose the same location as the one where the service was created >
* Service Instance:* < choose your Watson assistant >
* Skill name:* < choose the Watson skill >

#### In 'Speech to text': (make sure the ‘Enable location 1’ checkbox is checked)

Repeat the same steps as in Conversation.

* Voice:* < choose the preferred voice >

#### In 'Text to Speech': (make sure the ‘Enable location 1’ checkbox is checked)

Repeat the same steps as in Speech to text.

#### In 'Event Fowarding':

Leave the checkbox unchecked.

After clicking save, go back to the *Getting Started* tab.

Under the *Your Agent Endpoint*, copy the *Primary Endpoint* link (looks like: sip:us-south.voiceagent.cloud.ibm.com)


In your twilio page, on the left tab, click the three horizontal dots tab (*All Products and Services*), then click on *Elastic SIP Trunking*.

In the *Origination* tab on the left, click on the red plus sign (*add a new Origination URL*) and paste the *Primary Endpoint* link that was copied in the previous step.

In the *Numbers* tab on the left, add your number that you applied for when registering for the service.

Use your cellular phone to make a voice call to Watson service.



## Getting started for Voice-bot

You can easily check Voice-bot without telephone call. This is mainly for development.

### Pre-requistes

* ‘Watson assistant’ service deployed in IBM cloud services (with a dialog (skill) available) 
* ‘Speech to Text’ service deployed in IBM cloud services
* ‘Text to Speech’ service deployed in IBM cloud services


### Setup on VM

Deploy a VM, then install python3 and pip3.

Follow the instructions in [the link](https://github.com/IBM/watson-voice-bot#sample-output)

* In ‘Deployment options’, choose ‘Deploy locally’ then follow the rest of the instruction set by downloading the repository and installing everything in the VM.
* Configure the ‘.env’ file by inputting the correct API key and URL for each of the services installed in the pre-requisites list above.
* Choose port 8000 to forward the service to.

