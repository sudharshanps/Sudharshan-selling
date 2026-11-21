const API_BASE = 'http://localhost:5000/api';
const ADMIN_SECRET = 'sudharshan@admin2026';

async function runTests() {
  console.log("=================================================");
  console.log("STARTING SUDHARSHAN_TECH AUTOMATED ACCEPTANCE TESTS");
  console.log("=================================================\n");

  // TEST 0: Health check
  console.log("[TEST 0]: API Server Health Check");
  const healthRes = await fetch(`${API_BASE}/health`);
  const healthData = await healthRes.json();
  if (!healthRes.ok || healthData.status !== 'online') {
    throw new Error("Health check failed");
  }
  console.log("✓ Health check passed: Server online\n");

  // TEST 1: Customer selects Web Development and submits order
  console.log("[TEST 1]: Customer selects Website Development & Submits Order");
  const orderPayload = {
    customer_name: "Rahul Sharma",
    customer_email: "rahul.test@example.com",
    customer_phone: "+91 98765 43210",
    business_name: "Sharma Digital Retail",
    billing_address: "Coimbatore, Tamil Nadu",
    items: [
      {
        service_id: "srv-web",
        service_title: "Web Development",
        package_name: "Starter Landing Page",
        price: 1199,
        quantity: 1,
        custom_notes: "Landing page for local retail store"
      }
    ],
    total_amount: 1199,
    payment_method: "upi_qr",
    custom_requirements: "Need sleek mobile responsiveness and fast loading."
  };

  const orderRes = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });
  const orderData = await orderRes.json();

  if (!orderRes.ok || !orderData.orderId || !orderData.orderId.startsWith('ST-ORD-')) {
    throw new Error(`TEST 1 Failed: ${JSON.stringify(orderData)}`);
  }
  const createdOrderId = orderData.orderId;
  console.log(`✓ TEST 1 PASSED: Order saved with Unique ID: ${createdOrderId}`);
  console.log(`  Initial Payment Status: ${orderData.order.payment_status}`);
  console.log(`  Initial Order Status: ${orderData.order.order_status}\n`);

  // TEST 2: Customer submits custom quotation request
  console.log("[TEST 2]: Customer Submits Custom Quotation Request");
  const enquiryPayload = {
    customer_name: "Ananya Iyer",
    business_name: "Iyer AgriTech Solutions",
    customer_email: "ananya.agri@example.com",
    customer_phone: "+91 98450 11223",
    services_required: ["AI & Automation", "Custom Software Development"],
    project_description: "We require computer vision farm yield grading matching Drishti 360 concept.",
    estimated_budget: "₹25,000 – ₹50,000",
    timeline: "Standard (2-4 Weeks)",
    preferred_communication: "WhatsApp"
  };

  const enqRes = await fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiryPayload)
  });
  const enqData = await enqRes.json();

  if (!enqRes.ok || !enqData.enquiryId || !enqData.enquiryId.startsWith('ST-ENQ-')) {
    throw new Error(`TEST 2 Failed: ${JSON.stringify(enqData)}`);
  }
  console.log(`✓ TEST 2 PASSED: Custom Enquiry saved with Unique ID: ${enqData.enquiryId}\n`);

  // TEST 3: Customer uploads UTR & Payment Proof for Order
  console.log("[TEST 3]: Customer Submits UTR & Payment Proof for Order");
  const paymentPayload = {
    transaction_ref: "UTR492810928374",
    payment_proof: "/uploads/sample-payment-screenshot.jpg"
  };

  const payRes = await fetch(`${API_BASE}/orders/${createdOrderId}/payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentPayload)
  });
  const payData = await payRes.json();

  if (!payRes.ok || payData.order.payment_status !== 'Pending Verification') {
    throw new Error(`TEST 3 Failed: ${JSON.stringify(payData)}`);
  }
  console.log(`✓ TEST 3 PASSED: Payment submission saved and correctly marked: '${payData.order.payment_status}' (Never marked paid without admin review)\n`);

  // TEST 4: Admin verifies payment & changes order status to In Progress
  console.log("[TEST 4]: Admin Verifies Payment & Changes Order Status to 'In Progress'");
  const updateRes = await fetch(`${API_BASE}/admin/orders/${createdOrderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': ADMIN_SECRET
    },
    body: JSON.stringify({
      payment_status: 'Payment Verified',
      order_status: 'In Progress',
      admin_notes: 'UTR verified on bank statement. Kickoff meeting scheduled.'
    })
  });
  const updateData = await updateRes.json();

  if (!updateRes.ok || updateData.order.order_status !== 'In Progress' || updateData.order.payment_status !== 'Payment Verified') {
    throw new Error(`TEST 4 Failed: ${JSON.stringify(updateData)}`);
  }
  console.log(`✓ TEST 4 PASSED: Order updated to status: '${updateData.order.order_status}' and payment: '${updateData.order.payment_status}'\n`);

  // TEST 5: Verify Notification Reliability & Audit Logging
  console.log("[TEST 5]: Verify Notification Reliability & Audit Logs");
  const notifsRes = await fetch(`${API_BASE}/admin/notifications`, {
    headers: { 'x-admin-token': ADMIN_SECRET }
  });
  const notifs = await notifsRes.json();

  if (!Array.isArray(notifs) || notifs.length === 0) {
    throw new Error("TEST 5 Failed: No notification logs captured");
  }

  const orderNotif = notifs.find(n => n.related_id === createdOrderId);
  console.log(`✓ TEST 5 PASSED: Notification audit log captured reliably. Found ${notifs.length} total dispatched/logged events.`);
  if (orderNotif) {
    console.log(`  Event: ${orderNotif.event_type} | Recipient: ${orderNotif.recipient} | Status: ${orderNotif.status}`);
  }

  console.log("\n=================================================");
  console.log("🎉 ALL 5 ACCEPTANCE TESTS COMPLETED SUCCESSFULLY!");
  console.log("=================================================\n");
}

runTests().catch(err => {
  console.error("Test Suite Failed:", err);
  process.exit(1);
});
