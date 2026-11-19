const SENTENCES = [
  ["Hallo, ik heet Sara.", "Hello, my name is Sara.", "سلام، اسم من ساراست.", "A0", "Introductions"],
  ["Hoe heet jij?", "What's your name?", "اسمت چیه؟", "A0", "Introductions"],
  ["Ik kom uit Iran en ik woon in Utrecht.", "I'm from Iran, and I live in Utrecht.", "من اهل ایرانم و در اوترخت زندگی می‌کنم.", "A1", "Introductions"],
  ["Wat doe je graag in je vrije tijd?", "What do you like to do in your free time?", "دوست داری در وقت آزادت چه کار کنی؟", "A1", "Introductions"],
  ["Ik ben vorig jaar naar Nederland verhuisd.", "I moved to the Netherlands last year.", "پارسال به هلند نقل مکان کردم.", "A2", "Introductions"],
  ["Sinds ik hier woon, oefen ik elke dag Nederlands.", "Since I moved here, I've been practising Dutch every day.", "از وقتی اینجا زندگی می‌کنم، هر روز هلندی تمرین می‌کنم.", "A2", "Introductions"],

  ["Waar is het station?", "Where is the station?", "ایستگاه قطار کجاست؟", "A0", "Travel & directions"],
  ["Ik neem de bus.", "I'm taking the bus.", "با اتوبوس می‌روم.", "A0", "Travel & directions"],
  ["Hoe laat vertrekt de volgende trein?", "What time does the next train leave?", "قطار بعدی چه ساعتی حرکت می‌کند؟", "A1", "Travel & directions"],
  ["Ga rechtdoor en sla dan linksaf.", "Go straight ahead and then turn left.", "مستقیم برو و بعد به چپ بپیچ.", "A1", "Travel & directions"],
  ["Moet ik overstappen om in Den Haag te komen?", "Do I need to change trains to get to The Hague?", "برای رفتن به لاهه باید قطار عوض کنم؟", "A2", "Travel & directions"],
  ["Omdat de trein niet rijdt, gaan we met de bus.", "Because the train isn't running, we're taking the bus.", "چون قطار حرکت نمی‌کند، با اتوبوس می‌رویم.", "A2", "Travel & directions"],

  ["Hoeveel kost dit?", "How much does this cost?", "قیمت این چقدر است؟", "A0", "Shopping & food"],
  ["Ik wil graag water.", "I'd like some water.", "لطفاً کمی آب می‌خواهم.", "A0", "Shopping & food"],
  ["Mag ik de rekening, alstublieft?", "May I have the bill, please?", "می‌شود لطفاً صورت‌حساب را بدهید؟", "A1", "Shopping & food"],
  ["Kan ik hier pinnen?", "Can I pay by card here?", "می‌توانم اینجا با کارت پرداخت کنم؟", "A1", "Shopping & food"],
  ["Heeft u deze jas ook in een grotere maat?", "Do you have this coat in a larger size?", "این کت را در سایز بزرگ‌تر هم دارید؟", "A2", "Shopping & food"],
  ["Zit er melk in de soep? Ik ben allergisch voor melk.", "Is there milk in the soup? I'm allergic to milk.", "آیا در سوپ شیر هست؟ من به شیر حساسیت دارم.", "A2", "Shopping & food"],

  ["Ik ben thuis.", "I'm at home.", "من خانه‌ام.", "A0", "Daily life"],
  ["Het is koud vandaag.", "It's cold today.", "امروز هوا سرد است.", "A0", "Daily life"],
  ["Ik sta elke ochtend om zeven uur op.", "I get up at seven every morning.", "هر روز صبح ساعت هفت از خواب بیدار می‌شوم.", "A1", "Daily life"],
  ["Na het werk doe ik boodschappen.", "I do my grocery shopping after work.", "بعد از کار خرید خانه را انجام می‌دهم.", "A1", "Daily life"],
  ["Als het morgen mooi weer is, gaan we fietsen.", "If the weather is nice tomorrow, we'll go cycling.", "اگر فردا هوا خوب باشد، دوچرخه‌سواری می‌کنیم.", "A2", "Daily life"],
  ["Voordat ik ga slapen, lees ik meestal een paar bladzijden.", "Before I go to sleep, I usually read a few pages.", "قبل از خواب معمولاً چند صفحه کتاب می‌خوانم.", "A2", "Daily life"],

  ["Ik heb pijn.", "I'm in pain.", "درد دارم.", "A0", "Health & appointments"],
  ["Waar is de apotheek?", "Where is the pharmacy?", "داروخانه کجاست؟", "A0", "Health & appointments"],
  ["Ik wil graag een afspraak maken.", "I'd like to make an appointment.", "می‌خواهم وقت بگیرم.", "A1", "Health & appointments"],
  ["Ik voel me vandaag niet goed.", "I don't feel well today.", "امروز حالم خوب نیست.", "A1", "Health & appointments"],
  ["Ik heb sinds gisteren last van mijn keel.", "I've had a sore throat since yesterday.", "از دیروز گلودرد دارم.", "A2", "Health & appointments"],
  ["Kan ik mijn afspraak naar volgende week verplaatsen?", "Can I move my appointment to next week?", "می‌توانم وقتم را به هفتهٔ بعد منتقل کنم؟", "A2", "Health & appointments"],

  ["Ik begrijp het niet.", "I don't understand.", "متوجه نمی‌شوم.", "A0", "Learning Dutch"],
  ["Wat betekent dit?", "What does this mean?", "این یعنی چه؟", "A0", "Learning Dutch"],
  ["Kunt u wat langzamer praten?", "Could you speak a little more slowly?", "می‌توانید کمی آهسته‌تر صحبت کنید؟", "A1", "Learning Dutch"],
  ["Hoe schrijf je dat woord?", "How do you spell that word?", "آن کلمه را چطور می‌نویسند؟", "A1", "Learning Dutch"],
  ["Ik weet niet zeker of ik de vraag goed heb begrepen.", "I'm not sure whether I understood the question correctly.", "مطمئن نیستم سؤال را درست فهمیده باشم.", "A2", "Learning Dutch"],
  ["Kun je me een voorbeeld geven, zodat ik het beter begrijp?", "Could you give me an example so I can understand it better?", "می‌توانی یک مثال بزنی تا بهتر متوجه شوم؟", "A2", "Learning Dutch"]
];
