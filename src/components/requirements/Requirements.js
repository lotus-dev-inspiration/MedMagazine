import React from 'react';
import './Requirements.css';

const Requirements = () => {
    return <section className="Requirements">
        <div className="content">
            <div className="pay-attention">
                <p className="pay-attention__heading">Pay attantion, please !!!</p>
                <ul className="pay-attention__list">
                    <li className="pay-attention__item">To submit an article you need to be signed up on the site,</li>
                    <li className="pay-attention__item">The article by itself must not contain any mentioning about authors' names, another way the article will be rejected,</li>
                    <li className="pay-attention__item">There is 2 stages, when your article can be sent to rework: 1. By editor, 2.By reviewer,</li>
                    <li className="pay-attention__item">It's possible just submit the article 3 times per each of the stages mentioned above, another way it will be rejected,</li>
                    <li className="pay-attention__item">If the article contains more than 15 percent of plagiarism, it will be rejected.</li>
                </ul>
            </div>
            <h1 className="heading">Rules of articles formalization</h1>
            <ol className="requirements__list">
                <li className="requirements__item">The volume of the completed article must be at least 3 pages of A4 format (including sources list) and no more than 15 pages of A4 format (including sources list).
            </li>
                <li className="requirements__item">The font for typing, formulas, and tables in Microsoft Word for Windows are:
            <ul className="requirements__sublist">
                        <li className="requirements__subitem">Parameters of the text editor: all fields are 2 cm,</li>
                        <li className="requirements__subitem">Font is Times New Roman, 14 pt,</li>
                        <li className="requirements__subitem">Line spacing is 1.5,</li>
                        <li className="requirements__subitem">Width-alignment,</li>
                        <li className="requirements__subitem">Indentation is 1 cm,</li>
                        <li className="requirements__subitem">Page orientation is portrait,</li>
                        <li className="requirements__subitem">All illustrations and tables should be numbered and provided with names under them,</li>
                        <li className="requirements__subitem">Picture,</li>
                        <li className="requirements__subitem">Mathtype (version 5.0 or higher),</li>
                        <li className="requirements__subitem">the entire article must be duplicated in .pdf format.</li>
                    </ul>
                </li>
                <li className="requirements__item">The title must be written in the language of original in capital letters, center-aligned: THE TITLE OF THE ARTICLE,
                <p className="requirements__paragraph">on the next line (bold italic, right-aligned) is the full name of the author of the article,</p>
                    <p className="requirements__paragraph">on the next line (italic font, right-aligned) is the academic title, academic degree, name of the university, city or position, place of work, city (abbreviations are allowed),</p>
                    <p className="requirements__paragraph">on the next line (italic, right-aligned) – if there are more than one authors of the article, the information is repeated for each of them.</p>
                </li>
                <li className="requirements__item">The title is given in English: the same information is repeated in English</li>
                <li className="requirements__item">Annotation is in the original language and in English and it is not more than 300 characters (with spaces) for annotations in each language.</li>
                <li className="requirements__item">Keywords (given in the original and in English languages) are separated by a semicolon.</li>
                <li className="requirements__item">After 1 line – the text of the article.</li>
                <li className="requirements__item">After another 1 line – the inscription “Sources list”.
            <p className="requirements__paragraph">A list of sources is provided below in alphabetical order, with continuous numbering (see example). References in the text to the appropriate source from the list are made in square brackets, e.g. [5, p. 683]. The automatically paged links aren’t allowed.</p>
                </li>

            </ol>
        </div>
    </section>
};

export default Requirements;