const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
    // Pastikan method adalah POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    try {
        // Parse data dari request body
        const data = JSON.parse(event.body);
        
        // Inisialisasi Octokit dengan GitHub token
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN
        });

        // Dapatkan SHA dari file yang ada
        const { data: file } = await octokit.repos.getContent({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            path: 'data/dokumentasi.json'
        });

        // Update file di GitHub
        const response = await octokit.repos.createOrUpdateFileContents({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            path: 'data/dokumentasi.json',
            message: 'Update dokumentasi data via admin UI',
            content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
            sha: file.sha,
            branch: 'main'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "File updated successfully",
                data: response.data
            })
        };
    } catch (error) {
        console.error('Error:', error);
        
        // Tambahkan pesan error yang lebih spesifik
        let errorMessage = "Error updating file";
        if (error.message.includes("Bad credentials")) {
            errorMessage = "GitHub token tidak valid. Silakan gunakan Netlify CMS di /admin/ dengan login email Ariph9001@gmail.com";
        } else if (error.message.includes("Not Found")) {
            errorMessage = "Repo atau file tidak ditemukan. Pastikan konfigurasi repository sudah benar";
        } else if (!process.env.GITHUB_TOKEN) {
            errorMessage = "GITHUB_TOKEN tidak dikonfigurasi. Silakan gunakan Netlify CMS di /admin/ dengan login email Ariph9001@gmail.com";
        }
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: errorMessage,
                error: error.message
            })
        };
    }
}; 