import { useState } from 'react';
import { ImageCarousel } from '../components/Carousel/ImageCarousel';
import { MediaCard } from '../components/Media/MediaCard';
import { pageMedia } from '../data/pages';
import { meridianCarouselSlides } from '../data/meridianCarousel';
import { herbCategories } from '../data/herbCategories';
import { herbTablesByCategory } from '../data/herbTablesByCategory';
import { jiebiaoIntro } from '../data/jiebiaoYao';
import { tcmIntroVideos } from '../data/tcmIntroVideos';
import { useLanguage } from '../i18n/LanguageContext';
import { pickText, ui } from '../i18n/strings';
import { PageShell } from './PageShell';

export function PageOne() {
  const data = pageMedia.page1;
  const { lang } = useLanguage();
  const [expandedHerbId, setExpandedHerbId] = useState<string | null>(null);
  const zhLines = pickText(ui.start.subtitleZh, 'zh').split('\n');
  const langLines = pickText(ui.start.subtitleZh, lang).split('\n');
  return (
    <PageShell title={pickText(data.title, lang)} subtitle={pickText(data.subtitle, lang)}>
      <section className="welcomeHero">
        <div className="welcomeHero-left">
          <div className="welcomeQuote">
            <p className="welcomeQuote-text">
              {zhLines.map((zhLine, i) => (
                <span key={i}>
                  <span className="welcomeQuote-zh">{zhLine}</span>
                  <br />
                  <span className="welcomeQuote-lang">{langLines[i]}</span>
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="aboutUsSection" aria-labelledby="about-us-heading">
        <div className="aboutUsSectionBg" aria-hidden />
        <div className="aboutUsSectionContent">
          <h2 id="about-us-heading" className="aboutUsSectionTitle">
            {pickText(ui.aboutUsSection.title, lang)}
          </h2>
          <div className="aboutUsSectionText">
            <p>{pickText(ui.aboutUsSection.para1, lang)}</p>
            <p>{pickText(ui.aboutUsSection.para2, lang)}</p>
            <p>{pickText(ui.aboutUsSection.para3, lang)}</p>
          </div>
        </div>
      </section>

      {data.basicsItems && data.basicsItems.length > 0 && (
        <section className="basicsSection" aria-labelledby="basics-heading">
          <h2 id="basics-heading" className="basicsSectionTitle">
            {pickText(ui.basicsSection.title, lang)}
          </h2>

          <div className="basicsVideoBlock">
            <div className="basicsVideoGrid" role="list">
              {tcmIntroVideos.map((v) => (
                <div key={v.videoId} className="basicsVideoCard" role="listitem">
                  <div className="basicsVideoEmbed">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.videoId}`}
                      title={pickText(v.title, lang)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="basicsVideoTitle">{pickText(v.title, lang)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="basicsGrid">
            {data.basicsItems.map((item) =>
              item.id === 'p1-basics-2' ? (
                <div key={item.id} className="basicsCarouselBlock">
                  <h3 className="basicsBlockTitle">{pickText(item.title, lang)}</h3>
                  {item.description && (
                    <p className="basicsBlockDesc basicsCarouselDesc">{pickText(item.description, lang)}</p>
                  )}
                  <ImageCarousel slides={meridianCarouselSlides} />
                </div>
              ) : item.id === 'p1-basics-3' ? (
                <div key={item.id} className="basicsHerbBlock">
                  <h3 className="basicsBlockTitle">{pickText(item.title, lang)}</h3>
                  <p className="basicsBlockDesc jiebiaoIntro">{pickText(jiebiaoIntro, lang)}</p>
                  <h4 className="herbCategoryListTitle">{pickText(ui.basicsSection.jiebiao.byEffect, lang)}</h4>
                  <div className="herbCategoryList" role="list">
                    {herbCategories.map((cat) => {
                      const isExpanded = expandedHerbId === cat.id;
                      return (
                        <div key={cat.id} className="herbCategoryItem" role="listitem">
                          <button
                            type="button"
                            className={`herbCategoryBtn ${isExpanded ? 'herbCategoryBtn-expanded' : ''}`}
                            onClick={() => setExpandedHerbId(isExpanded ? null : cat.id)}
                            aria-expanded={isExpanded}
                            aria-controls={`herb-category-${cat.id}`}
                            id={`herb-btn-${cat.id}`}
                          >
                            <span className="herbCategoryBtnLabel">{pickText(cat.title, lang)}</span>
                            <span className="herbCategoryBtnIcon" aria-hidden>{isExpanded ? '−' : '+'}</span>
                          </button>
                          <div
                            id={`herb-category-${cat.id}`}
                            className={`herbCategoryContent ${isExpanded ? 'herbCategoryContent-open' : ''}`}
                            role="region"
                            aria-labelledby={`herb-btn-${cat.id}`}
                          >
                            {herbTablesByCategory[cat.id]?.map((block, bi) => (
                              <div key={bi}>
                                <h6 className="jiebiaoSubTitle">{pickText(block.subTitle, lang)}</h6>
                                <div className="jiebiaoTableWrap">
                                  <table className="jiebiaoTable">
                                    <thead>
                                      <tr>
                                        <th>{pickText(ui.basicsSection.jiebiao.colName, lang)}</th>
                                        <th>{pickText(ui.basicsSection.jiebiao.colProperty, lang)}</th>
                                        <th>{pickText(ui.basicsSection.jiebiao.colEffect, lang)}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {block.rows.map((row, i) => (
                                        <tr key={i}>
                                          <td>{pickText(row.药名, lang)}</td>
                                          <td>{pickText(row.性能用法, lang)}</td>
                                          <td>{pickText(row.功能主治, lang)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <MediaCard key={item.id} item={item} />
              )
            )}
          </div>
        </section>
      )}
    </PageShell>
  );
}

