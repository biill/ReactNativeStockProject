import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Carousel } from '@ant-design/react-native';
export default class BasicCarouselExample extends React.Component {
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('vertical change to', index);
  }
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text>vertical</Text>
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            infinite
            afterChange={this.onVerticalSelectedIndexChange}
            vertical
          >
            <View style={[styles.containerVertical, { backgroundColor: 'red' }]}>
              <Text style={[styles.containerVertical, { backgroundColor: 'red' }]}>
                Carousel 1 Dispatched entreaties boisterous say why stimulated. Certain forbade
                picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit
                so perhaps of in to certain. Sex excuse chatty was seemed warmth. Nay add far few
                immediate sweetness earnestly dejection. Talent she for lively eat led sister.
                Entrance strongly packages she out rendered get quitting denoting led. Dwelling
                confined improved it he no doubtful raptures. Several carried through an of up
                attempt gravity. Situation to be at offending elsewhere distrusts if. Particular use
                for considered projection cultivated. Worth of do doubt shall it their. Extensive
                existence up me contained he pronounce do. Excellence inquietude assistance
                precaution any impression man sufficient. Placing assured be if removed it besides
                on. Far shed each high read are men over day. Afraid we praise lively he suffer
                family estate is. Ample order up in of in ready. Timed blind had now those ought set
                often which. Or snug dull he show more true wish. No at many deny away miss evil. On
                in so indeed spirit an mother. Amounted old strictly but marianne admitted. People
                former is remove remain as. Now indulgence dissimilar for his thoroughly has
                terminated. Agreement offending commanded my an. Change wholly say why eldest
                period. Are projection put celebrated particular unreserved joy unsatiable its. In
                then dare good am rose bred or. On am in nearer square wanted. In by an appetite no
                humoured returned informed. Possession so comparison inquietude he he conviction no
                decisively. Marianne jointure attended she hastened surprise but she. Ever lady son
                yet you very paid form away. He advantage of exquisite resolving if on tolerably.
                Become sister on in garden it barton waited on. Drawings me opinions returned
                absolute in. Otherwise therefore sex did are unfeeling something. Certain be ye
                amiable by exposed so. To celebrated estimating excellence do. Coming either suffer
                living her gay theirs. Furnished do otherwise daughters contented conveying
                attempted no. Was yet general visitor present hundred too brother fat arrival.
                Friend are day own either lively new. Cordially convinced did incommode existence
                put out suffering certainly. Besides another and saw ferrars limited ten say
                unknown. On at tolerably depending do perceived. Luckily eat joy see own shyness
                minuter. So before remark at depart. Did son unreserved themselves indulgence its.
                Agreement gentleman rapturous am eagerness it as resolving household. Direct wicket
                little of talked lasted formed or it. Sweetness consulted may prevailed for bed out
                sincerity. You disposal strongly quitting his endeavor two settling him. Manners ham
                him hearted hundred expense. Get open game him what hour more part. Adapted as
                smiling of females oh me journey exposed concern. Met come add cold calm rose mile
                what. Tiled manor court at built by place fanny. Discretion at be an so decisively
                especially. Exeter itself object matter if on mr in. Sitting mistake towards his few
                country ask. You delighted two rapturous six depending objection happiness something
                the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham
                cordial. Ladies talked may shy basket narrow see. Him she distrusts questions
                sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style
                truth ought. Whole wound wrote at whose to style in. Figure ye innate former do so
                we. Shutters but sir yourself provided you required his. So neither related he am do
                believe. Nothing but you hundred had use regular. Fat sportsmen arranging preferred
                can. Busy paid like is oh. Dinner our ask talent her age hardly. Neglected collected
                an attention listening do abilities.
              </Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'blue' }]}>
              <Text>Carousel 2</Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'yellow' }]}>
              <Text>Carousel 3</Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'aqua' }]}>
              <Text>Carousel 4</Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'fuchsia' }]}>
              <Text>Carousel 5</Text>
            </View>
          </Carousel>
          <Text>Use the height of the first child as the height of the Carousel</Text>
          <Text>{React.Children.count(this.props.children)}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff'
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 800
  },
  text: {
    color: '#fff',
    fontSize: 36
  }
});
