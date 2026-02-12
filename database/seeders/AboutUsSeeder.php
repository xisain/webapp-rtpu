<?php

namespace Database\Seeders;

use App\Models\AboutUs;
use Illuminate\Database\Seeder;

class AboutUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create AboutUs record
        $aboutUs = AboutUs::create([
            'section_title' => 'Tentang RTPU PNJ',
            'section_description' => 'Rekayasa Teknologi dan Produk Unggulan (RTPU) Politeknik Negeri Jakarta berfokus pada penelitian terapan, pengembangan produk, dan transfer teknologi untuk mendukung industri serta peningkatan kompetensi mahasiswa dan staf. Kami bekerja sama dengan mitra industri untuk mengkomersialkan inovasi dan menyediakan pelatihan yang relevan dengan kebutuhan pasar.',
        ]);

        // Create HR team members
        $aboutUs->hrTeams()->createMany([
            [
                'name' => 'Dr., Ir., Dewi Yanti Liliana, S.Kom., M.Kom',
                'position' => 'Ketua RTPU',
                'photo_path' => null,
            ],
            [
                'name' => 'Asep Taufik Muharram, S.Kom, M.Kom',
                'position' => 'Sekretaris RTPU',
                'photo_path' => null,
            ],
            [
                'name' => 'Fitria Ayuningtias',
                'position' => 'Admin RTPU',
                'photo_path' => null,
            ],
        ]);
    }
}
