const supabase = require('./supabase');
const bcrypt = require('bcryptjs');

async function initSupabase() {
  try {
    console.log('🚀 Initializing Supabase database...\n');

    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('username')
      .eq('username', 'admin')
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
    } else {
      // Create default admin user
      console.log('Creating default admin user...');
      const passwordHash = await bcrypt.hash('admin123', 10);
      
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([{ 
          username: 'admin', 
          password_hash: passwordHash 
        }]);

      if (insertError) throw insertError;
      console.log('✅ Default admin user created');
    }

    // Display success message
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║                                                   ║');
    console.log('║     🎉 Supabase Database Initialized! 🎉          ║');
    console.log('║                                                   ║');
    console.log('║  Database: PostgreSQL (Supabase)                  ║');
    console.log('║                                                   ║');
    console.log('║  Admin Credentials:                               ║');
    console.log('║  Username: admin                                  ║');
    console.log('║  Password: admin123                               ║');
    console.log('║                                                   ║');
    console.log('║  ⚠️  Remember to change the password!              ║');
    console.log('║                                                   ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.error('\nMake sure you have:');
    console.error('1. Created tables using supabase-schema.sql in Supabase SQL Editor');
    console.error('2. Added SUPABASE_URL and SUPABASE_ANON_KEY to your .env file');
    process.exit(1);
  }
}

initSupabase();
