/* ============================================================
   Phishing Awareness Simulator — Email Scenario Data

   FICTIONAL TRAINING ENVIRONMENT.

   IMPORTANT TRAINING CONCEPT:
   A visible From address is not, by itself, proof that a
   message is trustworthy.

   The simulator exposes additional message/header-style fields
   such as:
     - From
     - To
     - Reply-To
     - Mailed-By
     - Signed-By

   These are educational representations. In a real mailbox,
   authentication/header information such as SPF, DKIM and DMARC
   can provide additional evidence about whether a message was
   authorized. They do not mean that every suspicious message
   will reveal a convenient "real sender" address.

   No credentials are transmitted by this training simulation.
   ============================================================ */

const EMAIL_SCENARIOS = [

  /* ==========================================================
     1. FAKE STORAGE WARNING
     ========================================================== */

  {
    id: "e1",
    isPhishing: true,

    sender: "IT Support",
    senderEmail: "it-support@inboxzero-secure.net",
    avatarInitial: "IT",

    subject: "Action Required: Your mailbox storage is full",
    time: "8:14 AM",

    preview:
      "Your mailbox has exceeded its storage limit. Click here to avoid service interruption...",

    linkText: "Upgrade Storage Now",

    linkHref:
      "https://inboxzero-secure.net.account-verify.cc/login",

    senderDetails: {
      from: "it-support@inboxzero-secure.net",
      to: "student@fictionalco.com",
      replyTo: "it-support@inboxzero-secure.net",
      mailedBy: "inboxzero-secure.net",
      signedBy: "Not verified",

      warning:
        "The visible sender address and the link destination do not belong to the same legitimate service."
    },

    body: `
      <p>Dear User,</p>

      <p>
        Your mailbox has exceeded its <b>15GB storage limit</b>.
        You will not be able to send or receive new messages until
        you verify your account and upgrade your storage.
      </p>

      <p>
        This is an automated message. Please act within
        <b>24 hours</b> to avoid service interruption.
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          Upgrade Storage Now
        </a>
      </p>

      <p>
        Thank you,<br>
        The IT Support Team
      </p>
    `,

    redFlags: [
      "Sender domain is inboxzero-secure.net rather than the legitimate service domain.",
      "The link destination uses a different domain entirely.",
      "Creates urgency with a 24-hour deadline.",
      "Uses a generic greeting.",
      "Asks you to verify your account through an emailed link."
    ],

    explanation:
      "This message uses a lookalike sender and a mismatched link destination to imitate an account-storage notice. The safest approach is to open the service yourself rather than using the link in the message."
  },


  /* ==========================================================
     2. NORMAL INTERNAL MESSAGE
     ========================================================== */

  {
    id: "e2",
    isPhishing: false,

    sender: "Priya Nair",
    senderEmail: "priya.nair@fictionalco.com",
    avatarInitial: "PN",

    subject: "Notes from today's planning meeting",
    time: "9:02 AM",

    preview:
      "Hey team, attaching the notes from our 9am sync. Let me know if I missed anything...",

    linkText: null,
    linkHref: null,

    senderDetails: {
      from: "priya.nair@fictionalco.com",
      to: "team@fictionalco.com",
      replyTo: "priya.nair@fictionalco.com",
      mailedBy: "fictionalco.com",
      signedBy: "fictionalco.com",
      warning: ""
    },

    body: `
      <p>Hey team,</p>

      <p>
        Attaching the notes from our 9am planning sync.
        A few action items:
      </p>

      <ul>
        <li>Finalize Q4 roadmap draft by Friday</li>
        <li>Schedule design review with the UX team</li>
        <li>Follow up with vendor on contract renewal</li>
      </ul>

      <p>Let me know if I missed anything.</p>

      <p>
        Thanks,<br>
        Priya
      </p>
    `,

    redFlags: [],

    explanation:
      "This is a legitimate internal email. The sender address matches the expected company domain, there is no urgent credential request, and the message looks like normal workplace communication."
  },


  /* ==========================================================
     3. LOOKALIKE SECURITY ALERT
     ========================================================== */

  {
    id: "e3",
    isPhishing: true,

    sender: "Account Security",
    senderEmail: "security-alert@inboxzer0.com",
    avatarInitial: "AS",

    subject: "⚠️ Unusual sign-in attempt detected",
    time: "9:47 AM",

    preview:
      "We detected a sign-in attempt from a new device in Kyiv, Ukraine. If this wasn't you...",

    linkText: "Secure My Account",

    linkHref:
      "http://inboxzer0-security.com/verify?id=88213",

    senderDetails: {
      from: "security-alert@inboxzer0.com",
      to: "student@fictionalco.com",
      replyTo: "security-alert@inboxzer0.com",
      mailedBy: "inboxzer0.com",
      signedBy: "Not verified",

      warning:
        "The sender uses inboxzer0.com with a zero replacing the letter O."
    },

    body: `
      <p>
        We detected a sign-in attempt from a new device:
      </p>

      <p>
        <b>Location:</b> Kyiv, Ukraine<br>
        <b>Device:</b> Windows PC<br>
        <b>Time:</b> Today, 9:41 AM
      </p>

      <p>
        If this wasn't you, your account may be compromised.
        Secure it immediately by confirming your identity.
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          Secure My Account
        </a>
      </p>
    `,

    redFlags: [
      "Sender domain uses a zero ('inboxzer0.com') instead of the letter 'o'.",
      "Link destination uses a different domain and plain HTTP.",
      "Uses fear and urgency around account compromise.",
      "Does not provide useful personalized account information."
    ],

    explanation:
      "This is a classic suspicious-login scam using a lookalike domain. The sender and destination should always be checked carefully before clicking."
  },


  /* ==========================================================
     4. LINKEDIN NOTIFICATION
     ========================================================== */

  {
    id: "e4",
    isPhishing: false,

    sender: "LinkedIn",
    senderEmail: "notifications@linkedin.com",
    avatarInitial: "in",

    subject: "You have 3 new connection requests",
    time: "10:15 AM",

    preview:
      "Jordan Lee and 2 others want to connect with you on LinkedIn...",

    linkText: "View all requests",

    linkHref:
      "https://www.linkedin.com/notifications/",

    senderDetails: {
      from: "notifications@linkedin.com",
      to: "student@fictionalco.com",
      replyTo: "notifications@linkedin.com",
      mailedBy: "linkedin.com",
      signedBy: "linkedin.com",
      warning: ""
    },

    body: `
      <p>
        You have new connection requests waiting:
      </p>

      <ul>
        <li>Jordan Lee — Product Manager at Acme Corp</li>
        <li>Sam Torres — UX Designer</li>
        <li>Ravi Shah — Software Engineer</li>
      </ul>

      <p>
        <a class="email-link" data-link="true" href="#">
          View all requests
        </a>
      </p>

      <p>— The LinkedIn Team</p>
    `,

    redFlags: [],

    explanation:
      "This is a routine notification. The sender domain and link destination match the expected service, and the message does not request sensitive information."
  },


  /* ==========================================================
     5. FAKE INVOICE
     ========================================================== */

  {
    id: "e5",
    isPhishing: true,

    sender: "Finance Dept",
    senderEmail: "finance@fictionalco-invoices.com",
    avatarInitial: "FD",

    subject: "Invoice #4471 — Payment overdue, please review",
    time: "11:03 AM",

    preview:
      "The attached invoice is now 15 days past due. Please review and process payment immediately...",

    linkText: "View Invoice",

    linkHref:
      "https://fictionalco-invoices.com.payment-portal.ru/invoice",

    senderDetails: {
      from: "finance@fictionalco-invoices.com",
      to: "accounting@fictionalco.com",
      replyTo: "finance@fictionalco-invoices.com",
      mailedBy: "fictionalco-invoices.com",
      signedBy: "Not verified",

      warning:
        "The sender domain is not the company's actual domain."
    },

    body: `
      <p>Hi,</p>

      <p>
        Invoice #4471 is now <b>15 days past due</b>.
        Please review the attached invoice and process payment
        immediately to avoid late fees.
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          View Invoice
        </a>
      </p>

      <p>
        Regards,<br>
        Finance Department
      </p>
    `,

    redFlags: [
      "Sender domain mimics the company name but is not the actual domain.",
      "The link ultimately goes to an unrelated .ru domain.",
      "Creates financial urgency.",
      "Provides little context for the supposed invoice.",
      "Unexpected payment requests should be independently verified."
    ],

    explanation:
      "This is a fake-invoice scam. Unexpected financial requests should be verified through a known contact method rather than the contact information contained in the suspicious message."
  },


  /* ==========================================================
     6. AMAZON SHIPPING
     ========================================================== */

  {
    id: "e6",
    isPhishing: false,

    sender: "Amazon",
    senderEmail: "shipment-tracking@amazon.com",
    avatarInitial: "A",

    subject: "Your package has shipped",
    time: "12:30 PM",

    preview:
      "Your order #112-5563921 is on its way! Estimated delivery: Thursday...",

    linkText: "Track Package",

    linkHref:
      "https://www.amazon.com/gp/your-account/order-history",

    senderDetails: {
      from: "shipment-tracking@amazon.com",
      to: "student@fictionalco.com",
      replyTo: "shipment-tracking@amazon.com",
      mailedBy: "amazon.com",
      signedBy: "amazon.com",
      warning: ""
    },

    body: `
      <p>
        Good news — your order is on its way!
      </p>

      <p>
        <b>Order #:</b> 112-5563921<br>
        <b>Estimated delivery:</b> Thursday, Oct 8
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          Track Package
        </a>
      </p>
    `,

    redFlags: [],

    explanation:
      "This is a legitimate shipping notification. The sender and destination use the expected company domain, and the message is consistent with a normal order update."
  },


  /* ==========================================================
     7. CEO GIFT CARD SCAM
     ========================================================== */

  {
    id: "e7",
    isPhishing: true,

    sender: "CEO - Marcus Webb",
    senderEmail: "marcus.webb@fictionalco.co",
    avatarInitial: "MW",

    subject: "Quick favor — are you at your desk?",
    time: "1:12 PM",

    preview:
      "Hey, are you available right now? I need you to handle something urgent and confidential...",

    linkText: null,
    linkHref: null,

    senderDetails: {
      from: "marcus.webb@fictionalco.co",
      to: "employee@fictionalco.com",
      replyTo: "marcus.webb@fictionalco.co",
      mailedBy: "fictionalco.co",
      signedBy: "Not verified",

      warning:
        "The domain differs from the company's normal .com domain."
    },

    body: `
      <p>Hey,</p>

      <p>
        Are you available right now? I need you to handle something
        urgent and confidential — I'm stuck in back-to-back meetings
        and can't talk.
      </p>

      <p>
        I need you to purchase 5 gift cards for a client appreciation
        event and send me the codes. I'll explain and reimburse you
        later today.
      </p>

      <p>Let me know ASAP.</p>

      <p>Marcus</p>
    `,

    redFlags: [
      "Domain is .co instead of the company's normal .com.",
      "Creates secrecy and urgency.",
      "Requests gift cards and codes.",
      "Attempts to bypass normal approval procedures.",
      "Says the explanation will come later."
    ],

    explanation:
      "This is an executive-impersonation gift-card scam. Unusual requests involving money or gift cards should always be verified through a separate, trusted communication channel."
  },


  /* ==========================================================
     8. GOOGLE SECURITY ALERT
     ========================================================== */

  {
    id: "e8",
    isPhishing: false,

    sender: "Google",
    senderEmail: "no-reply@accounts.google.com",
    avatarInitial: "G",

    subject: "Security alert: New sign-in on Windows",
    time: "2:40 PM",

    preview:
      "We noticed a new sign-in to your Google Account on a Windows device. If this was you...",

    linkText: "Check activity",

    linkHref:
      "https://myaccount.google.com/notifications",

    senderDetails: {
      from: "no-reply@accounts.google.com",
      to: "student@fictionalco.com",
      replyTo: "no-reply@accounts.google.com",
      mailedBy: "accounts.google.com",
      signedBy: "accounts.google.com",
      warning: ""
    },

    body: `
      <p>Hi,</p>

      <p>
        We noticed a new sign-in to your Google Account on a
        Windows device.
      </p>

      <p>
        If this was you, you don't need to do anything.
      </p>

      <p>
        If not, we'll help you secure your account.
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          Check activity
        </a>
      </p>
    `,

    redFlags: [],

    explanation:
      "This is a legitimate security notification. The sender and destination use the expected Google domains, and the message provides information without demanding immediate action."
  },


  /* ==========================================================
     9. FAKE HR PORTAL
     ========================================================== */

  {
    id: "e9",
    isPhishing: true,

    sender: "HR Benefits Team",
    senderEmail: "benefits@fictionalco-hr-portal.com",
    avatarInitial: "HR",

    subject: "Open enrollment ends tomorrow — update your info",
    time: "3:25 PM",

    preview:
      "Open enrollment closes tomorrow at 5pm. Confirm your benefits selections now to avoid losing coverage...",

    linkText: "Update My Benefits",

    linkHref:
      "https://fictionalco-hr-portal.com.benefits-confirm.info/login",

    senderDetails: {
      from: "benefits@fictionalco-hr-portal.com",
      to: "employee@fictionalco.com",
      replyTo: "benefits@fictionalco-hr-portal.com",
      mailedBy: "fictionalco-hr-portal.com",
      signedBy: "Not verified",

      warning:
        "The sender and link domains are not the company's normal domain."
    },

    body: `
      <p>
        Reminder:
        <b>Open enrollment closes tomorrow at 5:00 PM.</b>
      </p>

      <p>
        You must confirm your benefits selections and verify your
        login to avoid losing coverage for the upcoming year.
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          Update My Benefits
        </a>
      </p>

      <p>HR Benefits Team</p>
    `,

    redFlags: [
      "Sender domain is not the company's actual domain.",
      "Link goes to an unrelated .info domain.",
      "Uses a hard deadline.",
      "Threatens loss of benefits.",
      "Requests login verification through an email link."
    ],

    explanation:
      "This is a fake HR portal designed to harvest credentials. Access sensitive HR systems through a known company portal instead of following an unexpected login link."
  },


  /* ==========================================================
     10. DELTA CONFIRMATION
     ========================================================== */

  {
    id: "e10",
    isPhishing: false,

    sender: "Delta Air Lines",
    senderEmail: "no.reply@delta.com",
    avatarInitial: "D",

    subject: "Your flight confirmation — DL 1823",
    time: "4:05 PM",

    preview:
      "Thanks for booking with Delta! Here are your flight details for Oct 12...",

    linkText: "View Itinerary",

    linkHref:
      "https://www.delta.com/mytrips",

    senderDetails: {
      from: "no.reply@delta.com",
      to: "traveler@example.com",
      replyTo: "no.reply@delta.com",
      mailedBy: "delta.com",
      signedBy: "delta.com",
      warning: ""
    },

    body: `
      <p>
        Thanks for booking with Delta!
      </p>

      <p>
        <b>Flight:</b> DL 1823<br>
        <b>Date:</b> Oct 12<br>
        <b>Route:</b> JFK → SFO
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          View Itinerary
        </a>
      </p>
    `,

    redFlags: [],

    explanation:
      "This is a legitimate airline confirmation. The sender and destination use the expected company domain and the content is consistent with a normal booking confirmation."
  },


  /* ==========================================================
     11. RIT COMPROMISED STUDENT ACCOUNT
     ========================================================== */

  {
    id: "rit-compromised-account",

    isPhishing: true,

    avatarInitial: "R",

    sender: "RIT Account Security",

    /*
     * IMPORTANT:
     *
     * This sender address is intentionally believable.
     *
     * The training lesson is NOT:
     *
     * "rit.edu addresses are fake."
     *
     * The lesson is:
     *
     * "A legitimate-looking organizational address does not
     * automatically prove that the message itself is legitimate."
     *
     * A compromised student account can send a phishing email.
     */
    senderEmail: "xyz0000@rit.edu",

    subject:
      "Action required: your RIT account has been compromised",

    time: "9:14 AM",

    preview:
      "We detected unusual sign-in activity on your RIT account. Verify within 24 hours or your access will be suspended.",

    linkText:
      "Verify my account now",

    linkHref:
      "https://rit.edu.account-verify.example/secure-login",

    senderDetails: {
      from: "xyz0000@rit.edu",

      to: "xyz0000@rit.edu",

      replyTo: "xyz0000@rit.edu",

      mailedBy: "rit.edu",

      signedBy: "rit.edu",

      warning:
        "The sender address is a legitimate-looking @rit.edu student address. That does NOT prove the message is legitimate. A student's account can be compromised and used to send phishing messages."
    },

    body: `
      <p>
        Dear RIT user,
      </p>

      <p>
        Our system has detected that your RIT account has been
        <b>compromised</b>. Suspicious sign-ins were recorded from
        multiple locations.
      </p>

      <p>
        To protect your files, email, and student records, you must
        verify your account within <b>24 hours</b>.
        Accounts that are not verified will be suspended.
      </p>

      <p>
        <a class="email-link" data-link="true" href="#">
          Verify my account now
        </a>
      </p>

      <p>
        Thank you.<br>
        RIT Account Security Team
      </p>
    `,

    redFlags: [
      "The sender is an individual @rit.edu student address, not an official security or ITS mailbox, even though the display name says 'RIT Account Security'.",

      "A real @rit.edu address does not automatically make an email trustworthy. A compromised student account can be used to send phishing messages.",

      "The message creates urgency with a 24-hour deadline and threatens account suspension.",

      "It uses a generic greeting ('Dear RIT user') rather than identifying the recipient.",

      "Hovering over the link reveals account-verify.example as the real destination domain. 'rit.edu' is only being used as a subdomain prefix.",

      "The message asks you to sign in through an emailed link. A safer approach is to open the official RIT site yourself or contact ITS through a known channel."
    ],

    explanation:
      "This is a phishing email that intentionally uses a believable student @rit.edu address. The sender address may look legitimate because it really ends in @rit.edu, but that does not prove the message itself is trustworthy. A compromised student account could be used to send phishing messages. The strongest clues are the urgent 24-hour threat, generic greeting, and especially the link destination: account-verify.example. When in doubt, do not use the email link. Navigate to the official site yourself or contact the appropriate IT support channel."
  }
];
