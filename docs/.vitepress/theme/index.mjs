import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Milestone from './Milestone.vue'
import MilestonesList from './MilestonesList.vue'
import ProgramsList from './ProgramsList.vue'
import LibsList from './LibsList.vue'
import ContainersList from './ContainersList.vue'
import ConceptsList from './ConceptsList.vue'
import ConceptsHub from './ConceptsHub.vue'
import RustConcept from './RustConcept.vue'
import RustCinematic from './RustCinematic.vue'
import GithubConcept from './GithubConcept.vue'
import GithubCinematic from './GithubCinematic.vue'
import PhoneConcept from './PhoneConcept.vue'
import PhoneCinematic from './PhoneCinematic.vue'
import NetworkCinematic from './NetworkCinematic.vue'
import NetworkConcept from './NetworkConcept.vue'
import PhilosophyHub from './PhilosophyHub.vue'
import ComparisonsHub from './ComparisonsHub.vue'
import ComparisonView from './ComparisonView.vue'
import MainHub from './MainHub.vue'
import RvlbHome from './RvlbHome.vue'
import ThirdPartyView from './ThirdPartyView.vue'
import MilestonesPage from './MilestonesPage.vue'
import InitContainerPage from './InitContainerPage.vue'
import InitFunctionsPage from './InitFunctionsPage.vue'
import InitLibrariesPage from './InitLibrariesPage.vue'
import BusContainerPage from './BusContainerPage.vue'
import BusFunctionsPage from './BusFunctionsPage.vue'
import BusLibrariesPage from './BusLibrariesPage.vue'
import BusLegacyPage from './BusLegacyPage.vue'

import AuthContainerPage from './AuthContainerPage.vue'
import AuthFunctionsPage from './AuthFunctionsPage.vue'
import AuthLibrariesPage from './AuthLibrariesPage.vue'
import AuthFilesPage from './AuthFilesPage.vue'
import WatadHub from './WatadHub.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Milestone', Milestone)
    app.component('MilestonesList', MilestonesList)
    app.component('ProgramsList', ProgramsList)
    app.component('LibsList', LibsList)
    app.component('ContainersList', ContainersList)
    app.component('ConceptsList', ConceptsList)
    app.component('ConceptsHub', ConceptsHub)
    app.component('RustConcept', RustConcept)
    app.component('RustCinematic', RustCinematic)
    app.component('GithubConcept', GithubConcept)
    app.component('GithubCinematic', GithubCinematic)
    app.component('PhoneConcept', PhoneConcept)
    app.component('PhoneCinematic', PhoneCinematic)
    app.component('NetworkCinematic', NetworkCinematic)
    app.component('NetworkConcept', NetworkConcept)
    app.component('PhilosophyHub', PhilosophyHub)
    app.component('ComparisonsHub', ComparisonsHub)
    app.component('ComparisonView', ComparisonView)
    app.component('MainHub', MainHub)
    app.component('RvlbHome', RvlbHome)
    app.component('ThirdPartyView', ThirdPartyView)
    app.component('MilestonesPage', MilestonesPage)
    app.component('InitContainerPage', InitContainerPage)
    app.component('InitFunctionsPage', InitFunctionsPage)
    app.component('InitLibrariesPage', InitLibrariesPage)
    app.component('BusContainerPage', BusContainerPage)
    app.component('BusFunctionsPage', BusFunctionsPage)
    app.component('BusLibrariesPage', BusLibrariesPage)
    app.component('BusLegacyPage', BusLegacyPage)

    app.component('AuthContainerPage', AuthContainerPage)
    app.component('AuthFunctionsPage', AuthFunctionsPage)
    app.component('AuthLibrariesPage', AuthLibrariesPage)
    app.component('AuthFilesPage', AuthFilesPage)
    app.component('WatadHub', WatadHub)
  }
}
