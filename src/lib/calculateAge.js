export const calculateAge = (dobString) => {
    if (!dobString || typeof dobString !== 'string') return '';
    try {
        const formattedDob = dobString.replace(/\s\/\s/g, '-');
        const birthDate = new Date(formattedDob);

        if (isNaN(birthDate.getTime())) {
            console.error("Invalid date format:", dobString);
            return '';
        }

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 0) {
            return '';
        }

        return `満 ${age} 歳`;
    } catch (e) {
        console.error("Error calculating age:", e);
        return '';
    }
};