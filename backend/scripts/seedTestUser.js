/**
 * One-time seed script: registers Sandeep Sharma as a test user with isTestUser: true
 * Run from the backend directory: node scripts/seedTestUser.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const TEST_USER = {
    name: 'Sandeep Sharma',
    email: 'sandipsharm4321@gmail.com',
    password: '12102002',
    isTestUser: true,
    isVerified: true, // pre-verified so no email step needed
};

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: TEST_USER.email });
    if (existing) {
        // Update to ensure isTestUser flag is set
        existing.isTestUser = true;
        existing.isVerified = true;
        await existing.save({ validateBeforeSave: false });
        console.log(`✅ User already exists – updated isTestUser=true for: ${TEST_USER.email}`);
        await mongoose.disconnect();
        return;
    }

    const user = await User.create(TEST_USER);
    console.log(`✅ Test user created: ${user.email} (id: ${user._id})`);
    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
