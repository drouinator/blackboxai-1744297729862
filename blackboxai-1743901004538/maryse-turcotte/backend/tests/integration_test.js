const assert = require('assert');
const axios = require('axios');

// Configuration
const config = {
    clairapp: 'http://localhost:3000',
    dipps: 'http://localhost:3001',
    omegaAI: 'http://localhost:3002'
};

// Test Suite
async function runTests() {
    console.log('🚀 Starting Integration Tests...\n');
    
    try {
        // Test 1: Clairapp Service
        console.log('📋 Testing Clairapp Service...');
        const clairResponse = await axios.get(`${config.clairapp}/health`);
        assert.strictEqual(clairResponse.status, 200);
        console.log('✅ Clairapp Service: OK\n');

        // Test 2: DIPPS Integration
        console.log('📋 Testing DIPPS Integration...');
        const dippsResponse = await axios.get(`${config.dipps}/status`);
        assert.strictEqual(dippsResponse.status, 200);
        console.log('✅ DIPPS Integration: OK\n');

        // Test 3: Omega AI Connection
        console.log('📋 Testing Omega AI Connection...');
        const omegaResponse = await axios.get(`${config.omegaAI}/status`);
        assert.strictEqual(omegaResponse.status, 200);
        console.log('✅ Omega AI Connection: OK\n');

        // Test 4: End-to-End Command Test
        console.log('📋 Testing End-to-End Command...');
        const testCommand = {
            command: 'test',
            params: { echo: 'hello world' }
        };
        const commandResponse = await axios.post(`${config.clairapp}/command`, testCommand);
        assert.strictEqual(commandResponse.status, 200);
        console.log('✅ End-to-End Command: OK\n');

        // Test 5: System Resources
        console.log('📋 Testing System Resources...');
        const resourceResponse = await axios.get(`${config.dipps}/resources`);
        assert.strictEqual(resourceResponse.status, 200);
        console.log('✅ System Resources: OK\n');

        console.log('🎉 All Integration Tests Passed!\n');
        
        // Generate test report
        const testReport = {
            timestamp: new Date().toISOString(),
            tests: [
                { name: 'Clairapp Service', status: 'PASSED' },
                { name: 'DIPPS Integration', status: 'PASSED' },
                { name: 'Omega AI Connection', status: 'PASSED' },
                { name: 'End-to-End Command', status: 'PASSED' },
                { name: 'System Resources', status: 'PASSED' }
            ],
            summary: 'All tests passed successfully'
        };

        // Save test report
        require('fs').writeFileSync(
            'clairapp_test_log.txt',
            JSON.stringify(testReport, null, 2)
        );
        
        console.log('📝 Test report saved to clairapp_test_log.txt');

    } catch (error) {
        console.error('❌ Test Failed:', error.message);
        process.exit(1);
    }
}

// Run tests if called directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = runTests;
