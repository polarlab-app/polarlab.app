import $ from 'jquery';
import styles from '@css/main/gridItem.module.css';

export function checkVisibility() {
    $(`.${styles.griditem}, .${styles.siteheading}`).each(function () {
        const elementTop = $(this).offset().top;
        const windowTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (elementTop < windowTop + windowHeight * 0.9) {
            $(this).addClass(styles.animate);
        } else {
            $(this).removeClass(styles.animate);
        }
    });
}

export function setupVisibilityCheck() {
    $(window).on('scroll', checkVisibility);

    return () => {
        $(window).off('scroll', checkVisibility);
    };
}
