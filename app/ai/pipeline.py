from app.ai.entity_extractor import EntityExtractor
from app.ai.summarizer import ComplaintSummarizer
from app.ai.classifier import CrimeClassifier
from app.ai.priority import PriorityEngine
from app.ai.bns_mapper import BNSMapper
from app.ai.missing_info import MissingInformationDetector
from app.ai.investigation_checklist import InvestigationChecklist


class ComplaintPipeline:

    def __init__(self):

        self.extractor = EntityExtractor()
        self.summarizer = ComplaintSummarizer()
        self.classifier = CrimeClassifier()
        self.priority = PriorityEngine()
        self.bns = BNSMapper()
        self.missing = MissingInformationDetector()
        self.checklist = InvestigationChecklist()

    def analyze(self, text):

        entities = self.extractor.extract(text)

        category = self.classifier.classify(text)

        return {

            "summary": self.summarizer.summarize(text),

            "crime_category": category,

            "priority": self.priority.predict(text),

            "entities": entities,

            "bns_sections": self.bns.suggest(category),

            "missing_information":
                self.missing.detect(
                    category,
                    entities
                ),

            "investigation_checklist":
                self.checklist.generate(category)

        }