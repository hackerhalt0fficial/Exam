// UpskillNexus Linux Fundamentals CTF - Answer Validation System

// Answer database with all correct answers
const answers = {
    1: ["cat secret.txt", "less secret.txt", "more secret.txt", "head secret.txt", "tail secret.txt", "nl secret.txt"],
    2: ["chmod u+x runme.sh", "chmod 700 runme.sh", "chmod 744 runme.sh", "chmod +x runme.sh"],
    3: ["ps -u www-data", "ps -U www-data", "pgrep -u www-data", "ps aux | grep www-data"],
    4: ["wc -l data.log", "cat data.log | wc -l"],
    5: ["netstat -tulpn", "netstat -tln", "ss -tulpn", "ss -tln", "lsof -iTCP -sTCP:LISTEN -P -n"],
    6: ["tail -20 /var/log/syslog", "tail -n 20 /var/log/syslog" , "tail /var/log/syslog"],
    7: ["ip a", "ip addr", "ifconfig", "hostname -I", "ip address show"],
    8: ["grep error *.log", "grep 'error' *.log"],
    9: ["who", "w", "users", "whoami"],
    10: {
        a: ["which apache2", "whereis apache2", "which httpd", "whereis httpd"],
        b: ["python3 -m http.server 8000", "python -m SimpleHTTPServer 8000", "python -m http.server 8000"]
    },
    11: ["mkdir projects"],
    12: ["touch notes.txt", "> notes.txt", "echo -n > notes.txt"],
    13: ["pwd"],
    14: ["cp file1.txt file2.txt"],
    15: ["mv oldname.txt newname.txt"],
    16: ["rm temp.txt"],
    17: ["cd ..", "cd ../"],
    18: ["man ls"],
    19: ["lsb_release -a", "cat /etc/*release", "cat /etc/issue", "hostnamectl"],
    20: ["clear", "reset"]
};

// Flags for each level
const flags = {
    1: "FLAG{F1l3_N4v1g4t10n_101}",
    2: "FLAG{P3rm1ss10ns_M4tt3r}",
    3: "FLAG{Pr0c355_M4n4g3m3nt}",
    4: "FLAG{T3xt_Pr0c3551ng}",
    5: "FLAG{N3tw0rk1ng_B45ic5}",
    6: "FLAG{L0g_F1l3_1nsp3ct10n}",
    7: "FLAG{1P_4ddr3ss_D1sc0v3ry}",
    8: "FLAG{Gr3p_M4st3ry}",
    9: "FLAG{Us3r_S3ss10n_1nfo}",
    10: "FLAG{W3b_S3rv3r_5k1ll5}",
    11: "FLAG{D1r3ct0ry_Cr34t0r}",
    12: "FLAG{F1l3_M4k3r}",
    13: "FLAG{Wh3r3_4m_1}",
    14: "FLAG{C0py_C4t}",
    15: "FLAG{M0v3r_Sh4k3r}",
    16: "FLAG{D3l3t0r}",
    17: "FLAG{Up_4_L3v3l}",
    18: "FLAG{M4nu4l_R34d3r}",
    19: "FLAG{Syst3m_1nf0}",
    20: "FLAG{Cl34n_5t4rt}"
};

// Track completed levels
const completedLevels = new Set();

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current date on certificate
    const today = new Date();
    document.getElementById('certificate-date').textContent = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Toggle hint visibility
function toggleHint(level) {
    const hintContent = document.getElementById(`hint${level}`);
    const hintButton = document.querySelector(`#hint${level}`).previousElementSibling;
    
    hintContent.classList.toggle('show');
    hintButton.classList.toggle('active');
}

// Validate user answers
function checkAnswer(level) {
    let isCorrect = false;
    const resultDiv = document.getElementById(`result${level}`);
    
    // Special handling for level 10 with two questions
    if (level === 10) {
        const answerA = document.getElementById('answer10a').value.trim().toLowerCase();
        const answerB = document.getElementById('answer10b').value.trim().toLowerCase();
        
        const isCorrectA = answers[10].a.some(correct => answerA === correct.toLowerCase());
        const isCorrectB = answers[10].b.some(correct => answerB === correct.toLowerCase());
        
        isCorrect = isCorrectA && isCorrectB;
    } else {
        const userAnswer = document.getElementById(`answer${level}`).value.trim().toLowerCase();
        isCorrect = answers[level].some(correct => userAnswer === correct.toLowerCase());
    }
    
    if (isCorrect) {
        resultDiv.textContent = `✅ Correct! Flag: ${flags[level]}`;
        resultDiv.className = "result correct";
        completedLevels.add(level);
        
        // Check if all levels are completed
        if (completedLevels.size === Object.keys(answers).length) {
            showCompletionCertificate();
        }
    } else {
        resultDiv.textContent = "❌ Incorrect. Try again!";
        resultDiv.className = "result incorrect";
    }
}

// Show completion certificate
function showCompletionCertificate() {
    const certificate = document.getElementById('completion-certificate');
    certificate.classList.remove('hidden');
    
    // Smooth scroll to certificate
    certificate.scrollIntoView({ behavior: 'smooth' });
    
    // Set participant name (would be dynamic in a real application)
    document.querySelector('.recipient-name').textContent = "Participant";
}

// Copy final flag to clipboard
function copyFlag() {
    const flagText = document.querySelector('.flag').textContent;
    navigator.clipboard.writeText(flagText).then(() => {
        alert('Flag copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy flag: ', err);
    });
}   