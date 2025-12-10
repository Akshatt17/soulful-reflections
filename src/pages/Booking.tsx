import PageLayout from "@/components/PageLayout";
import { Calendar } from "lucide-react";

const Booking = () => (
  <PageLayout>
    <section className="section-padding bg-background min-h-[60vh] flex items-center">
      <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-sage" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-primary mb-4">Booking Coming Soon</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          We're working on bringing you a seamless teleconsultation booking experience. 
          Check back soon for updates.
        </p>
        {/* TODO: Implement booking calendar and payment integration */}
        <div className="bg-muted rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">Want to be notified when booking is available? Subscribe to our newsletter on the homepage.</p>
        </div>
      </div>
    </section>
  </PageLayout>
);
export default Booking;
