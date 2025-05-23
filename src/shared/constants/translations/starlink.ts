export const contactInfo = {
    bankAccount: '4393322',
    bankName: 'Bank of Khartoum - Bankak',
    accountName: 'ISHAG ADAM ALHAJ',
    whatsapp: '+32499891600',
    telegram: '@MigelPaySupport',
    telegramChannelInvitationCode: 't.me/migelpay',
    responseTime: 'a minutes',
    contactPerson: {
        name: 'Galal Ali',
        position: 'Starlink Payment Manager',
        photo: '/assets/galal.jpg'
    }
};

export const starlinkPageContent = {
    en: {
        title: "Starlink Bill Payment Service",
        subtitle: "Enter your Starlink subscription amount and we'll calculate the equivalent in Sudanese Pounds",
        currencyLabel: "The currency that you use to pay for Starlink",
        amountLabel: "Monthly Amount",
        currencies: {
            USD: "United States Dollar",
            EUR: "Euro",
            NGN: "Nigerian Naira",
            KES: "Kenyan Shilling",
            PHP: "Philippine Peso",
            MWK: "Malawian Kwacha",
            ZMW: "Zambian Kwacha",
            SDG: "Sudanese Pound",
        },
        paymentBreakdown: "Payment Breakdown",
        convertedAmount: "Converted Amount",
        processingFee: "Processing Fee",
        totalLabel: "Total Amount to Send:",
        warningNote: "Send this exact total amount to avoid processing delays",
        nameLabel: "Your Full Name",
        contactLabel: "WhatsApp / Telegram / Facebook (for contact)",
        emailLabel: "Starlink Account Email",
        passwordLabel: "Starlink Account Password",
        passwordHint: "We only use this to process your payment. Consider changing your password after.",
        uploadProof: "Payment Proof (Screenshot/Receipt)",
        termsLabel: (amount: string, fee: string) =>
            `I confirm that I've sent ${amount} SDG (including ${fee} SDG fee) to MigelPay`,
        termsAgree: "By checking this box, you agree to our",
        termsLink: "terms of service",
        recaptchaNote: "We use reCAPTCHA to prevent spam.",
        submit: "Submit Payment Request",
        successMsg: (time: string) =>
            `Your payment request has been submitted successfully! We'll contact you within ${time}.`,
        errorMsg: "There was an error submitting your request. Please try again or contact support.",
        instructionsTitle: "Payment Instructions",
        bankTitle: "Bank Transfer Details",
        bankName: `Bank Name: ${contactInfo.bankName}`,
        accountName: `Account Name: ${contactInfo.accountName}`,
        bankAccount: `Account Number: ${contactInfo.bankAccount}`,
        includeEmailNote: "Important: Include your email in the payment reference",
        contactAfterPayment: "Contact After Payment",
        contactPerson: "Galal Ali",
        contactPosition: "Starlink Payment Manager",
        contactHint: "Reach out to us after sending your payment",
        contactWhatsapp: "📱 Contact via WhatsApp",
        contactTelegram: "💬 Chat on Telegram",
        contactChannel: "📢 Join Telegram Channel",
        processingTimeTitle: "Processing Time",
        processingTimeText: "Your Starlink service will be renewed within a minutes",
        notesTitle: "Important Notes",
        notes: [
            "Send the exact calculated amount in SDG",
            "Include your email in the payment reference",
            "Contact us immediately if you encounter any issues",
            "Keep your payment proof until service is renewed",
            "We don't charge any extra fees - you pay only the converted amount",
            (fee: string) => `Total payment includes a ${fee} SDG processing fee`
        ]
    },

    ar: {
        title: "خدمة دفع فاتورة ستارلينك",
        subtitle: "أدخل مبلغ اشتراكك في ستارلينك وسنحسب ما يعادله بالجنيه السوداني",
        currencyLabel: "العملة التي تستخدمها لدفع فاتورة ستارلينك",
        amountLabel: "المبلغ الشهري",
        currencies: {
            USD: "دولار أمريكي",
            EUR: "يورو",
            NGN: "نايرا نيجيرية",
            KES: "شلن كيني",
            PHP: "بيزو فلبيني",
            MWK: "كواشا مالاوي",
            ZMW: "كواشا زامبي",
            SDG: "جنيه سوداني"
        },
        paymentBreakdown: "تفاصيل الدفع",
        convertedAmount: "المبلغ المحول",
        processingFee: "رسوم المعالجة",
        totalLabel: "إجمالي المبلغ المطلوب إرساله:",
        warningNote: "أرسل هذا المبلغ بالضبط لتجنب تأخير المعالجة",
        nameLabel: "الاسم الكامل",
        contactLabel: "واتساب / تيليجرام / فيسبوك (للتواصل)",
        emailLabel: "البريد الإلكتروني لحساب ستارلينك",
        passwordLabel: "كلمة مرور حساب ستارلينك",
        passwordHint: "نستخدم هذه المعلومات فقط لإتمام عملية الدفع. يُفضل تغيير كلمة المرور لاحقًا.",
        uploadProof: "إثبات الدفع (لقطة شاشة/إيصال)",
        termsLabel: (amount: string, fee: string) =>
            `أؤكد أنني أرسلت ${amount} جنيه سوداني (شاملة رسوم ${fee} جنيه) إلى MigelPay`,
        termsAgree: "بتحديد هذا الخيار، فإنك توافق على",
        termsLink: "شروط الخدمة",
        recaptchaNote: "نستخدم reCAPTCHA لمنع الرسائل المزعجة.",
        submit: "إرسال طلب الدفع",
        successMsg: (time: string) =>
            `تم إرسال طلب الدفع بنجاح! سنتواصل معك خلال ${time}.`,
        errorMsg: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل مع الدعم.",
        instructionsTitle: "تعليمات الدفع",
        bankTitle: "تفاصيل التحويل البنكي",
        bankName: "اسم البنك: بنك الخرطوم - بنكك",
        accountName: "اسم الحساب: اسحق ادم الحاج",
        bankAccount: `رقم الحساب: ${contactInfo.bankAccount}`,
        includeEmailNote: "هام: تأكد من تضمين بريدك الإلكتروني في مرجع الدفع",
        contactAfterPayment: "التواصل بعد الدفع",
        contactPerson: "جلال على ",
        contactPosition: "مدير دفع ستارلينك",
        contactHint: "تواصل معنا بعد إرسال الدفع",
        contactWhatsapp: "📱 تواصل عبر واتساب",
        contactTelegram: "💬 دردش عبر تيليجرام",
        contactChannel: "📢 انضم إلى قناة تيليجرام",
        processingTimeTitle: "مدة المعالجة",
        processingTimeText: " سيتم تجديد خدمة ستارلينك الخاصة بك خلال دقائق",
        notesTitle: "ملاحظات مهمة",
        notes: [
            "أرسل المبلغ المحسوب بالضبط بالجنيه السوداني",
            "قم بتضمين بريدك الإلكتروني في مرجع الدفع",
            "تواصل معنا فورًا إذا واجهت أي مشكلة",
            "احتفظ بإثبات الدفع حتى يتم تجديد الخدمة",
            "لا نفرض أي رسوم إضافية - أنت تدفع فقط المبلغ المحول",
            (fee: string) => `يشمل الدفع الكلي رسوم معالجة قدرها ${fee} جنيه سوداني`
        ]
    }
};
